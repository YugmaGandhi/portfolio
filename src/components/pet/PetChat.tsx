import { useEffect, useRef, useState, FormEvent } from 'react';
import { ChatMessage, getReply } from './chatEngine';
import { PetAction, PET_GREETING, QUICK_CHIPS } from '../../data/petKnowledge';
import { isSoundOn, setSoundOn, playSound } from './sounds';

interface PetChatProps {
  heartCount: number;
  onAction: (action: PetAction) => void;
  onClose: () => void;
  /** Lets the pet sprite react (chomping mouth) while he is "typing". */
  onTypingChange: (typing: boolean) => void;
  /** What section of the page is currently on screen. */
  getCurrentSection: () => string | null;
}

const STREAM_WORD_MS = 55;

const PetChat = ({ heartCount, onAction, onClose, onTypingChange, getCurrentSection }: PetChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'pet', text: PET_GREETING }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [soundOn, setSoundOnState] = useState(isSoundOn);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamTimerRef = useRef<number | null>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, typing]);

  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      if (streamTimerRef.current) window.clearInterval(streamTimerRef.current);
      onTypingChange(false);
    };
  }, [onTypingChange]);

  const streamReply = (text: string, onDone: () => void) => {
    const words = text.split(' ');
    let shown = 0;
    setMessages((prev) => [...prev, { role: 'pet', text: '' }]);
    streamTimerRef.current = window.setInterval(() => {
      shown++;
      const partial = words.slice(0, shown).join(' ');
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: 'pet', text: partial };
        return next;
      });
      if (shown >= words.length) {
        if (streamTimerRef.current) window.clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
        onDone();
      }
    }, STREAM_WORD_MS);
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setInput('');
    const history = messages;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setTyping(true);
    onTypingChange(true);

    const reply = await getReply(history, trimmed, { currentSection: getCurrentSection() });
    // "thinking" time scales with how much he has to say
    const thinkMs = Math.min(Math.max(350 + reply.text.length * 5, 450), 1400);
    await new Promise((resolve) => setTimeout(resolve, thinkMs));

    playSound('woof');
    streamReply(reply.text, () => {
      setTyping(false);
      onTypingChange(false);
      if (reply.action) {
        window.setTimeout(() => onAction(reply.action!), 350);
      }
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundOnState(next);
    if (next) playSound('woof');
  };

  return (
    <div className="pet-chat" role="dialog" aria-label="Chat with BYTE">
      <div className="pet-chat__header">
        <span className="pet-chat__title">
          BYTE.EXE <span className="pet-chat__hearts">♥{heartCount}</span>
        </span>
        <span className="pet-chat__header-actions">
          <button
            type="button"
            className="pet-chat__close"
            onClick={toggleSound}
            aria-label={soundOn ? 'Mute sounds' : 'Enable sounds'}
            title={soundOn ? 'Mute' : 'Sound on'}
          >
            {soundOn ? '♪' : '∅'}
          </button>
          <button type="button" className="pet-chat__close" onClick={onClose} aria-label="Close chat">
            ✕
          </button>
        </span>
      </div>

      <div className="pet-chat__log" ref={logRef}>
        {messages.map((message, i) => (
          <div key={i} className={`pet-chat__msg pet-chat__msg--${message.role}`}>
            {message.text}
          </div>
        ))}
        {typing && messages[messages.length - 1]?.role === 'user' && (
          <div className="pet-chat__msg pet-chat__msg--pet pet-chat__typing" aria-label="BYTE is typing">
            <span>🐾</span>
            <span>🐾</span>
            <span>🐾</span>
          </div>
        )}
      </div>

      <div className="pet-chat__chips">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            className="pet-chat__chip"
            onClick={() => send(chip.message)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <form className="pet-chat__inputbar" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="pet-chat__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ASK BYTE..."
          maxLength={300}
          aria-label="Message BYTE"
        />
        <button type="submit" className="pet-chat__send" disabled={!input.trim() || typing}>
          ▸
        </button>
      </form>
    </div>
  );
};

export default PetChat;

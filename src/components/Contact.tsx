import { useState, FormEvent, ReactElement } from 'react';
import { Box, Typography, Grid, TextField, Button, Paper, IconButton, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Email, Phone, LocationOn, GitHub, LinkedIn, Send } from '@mui/icons-material';
import SectionFrame from './common/SectionFrame';
import { site } from '../data/site';

interface Channel {
  icon: ReactElement;
  label: string;
  value: string;
  href?: string;
}

const channels: Channel[] = [
  { icon: <Email fontSize="small" />, label: 'EMAIL', value: site.email, href: `mailto:${site.email}` },
  { icon: <Phone fontSize="small" />, label: 'PHONE', value: site.phone, href: site.phoneHref },
  { icon: <LocationOn fontSize="small" />, label: 'BASE', value: site.location },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <SectionFrame
      id="contact"
      code="04"
      fileLabel="COMMS.LOG"
      status="RECEIVING"
      title="Comms"
      accent="Terminal"
      description="Looking for a developer, have a question, or just want to connect? Open a channel below."
    >
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ height: '100%' }}
          >
            <Paper className="comms-panel" elevation={0}>
              <Box className="terminal-line">
                <Typography component="span" className="terminal-prompt">&gt;</Typography>
                <Typography component="span">OPEN_CHANNELS</Typography>
              </Box>

              <Stack spacing={2} sx={{ flex: 1 }}>
                {channels.map((channel) => (
                  <Box className="stat-block comms-channel" key={channel.label}>
                    <Box className="comms-channel__icon">{channel.icon}</Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="caption" className="stat-block__label">
                        {channel.label}
                      </Typography>
                      {channel.href ? (
                        <Typography
                          component="a"
                          href={channel.href}
                          variant="body1"
                          className="stat-block__value comms-channel__link"
                        >
                          {channel.value}
                        </Typography>
                      ) : (
                        <Typography variant="body1" className="stat-block__value">
                          {channel.value}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Box className="comms-social">
                <Typography variant="caption" className="stat-block__label" sx={{ display: 'block', mb: 1.5 }}>
                  GUILD LINKS
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  <IconButton
                    component="a"
                    href={site.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                  >
                    <GitHub />
                  </IconButton>
                  <IconButton
                    component="a"
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedIn />
                  </IconButton>
                </Stack>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ height: '100%' }}
          >
            <Paper className="comms-panel" elevation={0}>
              <Box className="terminal-line">
                <Typography component="span" className="terminal-prompt">&gt;</Typography>
                <Typography component="span">SEND_TRANSMISSION</Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" endIcon={<Send />} sx={{ px: 4, py: 1.45 }}>
                      Send Transmission
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                      Opens your mail app with the message ready to send.
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </SectionFrame>
  );
};

export default Contact;

/**
 * GoatCounter analytics — privacy-friendly, cookieless visit tracking.
 *
 * Loads the GoatCounter counter script only when VITE_GOATCOUNTER_CODE is set
 * (see .env.production). With no code configured — e.g. local dev — this is a
 * no-op, so nothing is requested and no visits are recorded. GoatCounter also
 * ignores localhost on its own, but gating here keeps dev builds fully clean.
 *
 * Set up: register a site at https://www.goatcounter.com (personal use is free),
 * then put your code in .env.production, e.g. VITE_GOATCOUNTER_CODE=yugma
 * for a yugma.goatcounter.com dashboard. Rebuild + deploy to activate.
 */
export const initAnalytics = () => {
  const code = import.meta.env.VITE_GOATCOUNTER_CODE;
  if (!code) return;

  // Guard against double-injection (e.g. React 18 StrictMode double-invoke).
  if (document.querySelector('script[data-goatcounter]')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = '//gc.zgo.at/count.js';
  script.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
  document.head.appendChild(script);
};

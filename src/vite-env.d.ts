/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GoatCounter site code (e.g. "yugma" → yugma.goatcounter.com). Empty disables analytics. */
  readonly VITE_GOATCOUNTER_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

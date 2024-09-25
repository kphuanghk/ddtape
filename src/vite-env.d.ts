/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
  readonly VITE_API_BASEURL: string
  readonly VITE_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare var PDFDocument: PDFKit.PDFDocument

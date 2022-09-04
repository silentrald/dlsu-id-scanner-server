

export interface Logger {
  fatal: (msg: any) => void;
  error: (msg: any) => void;
  warn: (msg: any) => void;
  info: (msg: any) => void;
  debug: (msg: any) => void;
  trace: (msg: any) => void;
}

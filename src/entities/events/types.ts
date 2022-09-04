
export interface Event {
  id?: string;
  name: string;
  max: number;
  timeStart: string;
  timeEnd: string;
}

export interface EventEntity {
  getId: () => string | undefined;
  getName: () => string;
  getMax: () => number;
  getTimeStart: () => string;
  getTimeEnd: () => string;
}

export interface MakeEventConfig {
  validator: (e: Event) => Record<string, string> | undefined;
  sanitizer: (e: Event) => Event;
}


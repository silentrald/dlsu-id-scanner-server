import EntityError from '@entities/core/error';
import { Event, EventEntity, MakeEventConfig } from './types';


export class EventEntityError extends EntityError {
  constructor(errors: Record<string, string>) {
    super('EventEntityError', errors);
  }
}

const buildMakeEvent = ({
  validator,
  sanitizer
}: MakeEventConfig) => {
  return (event: Event): EventEntity => {
    event = sanitizer(event);
    const errors = validator(event);
    if (errors) {
      throw new EventEntityError(errors);
    }

    return Object.freeze({
      getId: () => event.id,
      getName: () => event.name,
      getMax: () => event.max,
      getTimeStart: () => event.timeStart,
      getTimeEnd: () => event.timeEnd,
    });
  };
};

export default buildMakeEvent;


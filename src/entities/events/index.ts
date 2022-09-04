import { Event } from './types';

import { makeValidator, parseError } from '@interfaces/validator';
import { JSONSchemaType } from 'ajv';
import buildMakeEvent from './build';

const schema: JSONSchemaType<Event> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    max: {
      type: 'number',
      minimum: 0,
    },
    timeStart: {
      type: 'string',
      format: 'date-time'
    },
    timeEnd: {
      type: 'string',
      format: 'date-time',
    }
  },
  required: [ 'name', 'max', 'timeStart', 'timeEnd' ],
  additionalProperties: false
};

const validate = makeValidator(schema);
const validator = (event: Event): Record<string, string> | undefined => {
  const valid = validate(event);
  if (!valid) {
    return parseError(validate.errors!);
  }
};

const sanitizer = (event: Event): Event => {
  if (event.name) {
    event.name = event.name.toString().trim();
  }

  return event;
};

const makeEvent = buildMakeEvent({
  validator,
  sanitizer,
});

export default makeEvent;


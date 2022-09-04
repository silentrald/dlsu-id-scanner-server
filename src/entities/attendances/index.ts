import { Attendance } from './types';

import { makeValidator, parseError } from '@interfaces/validator';
import { JSONSchemaType } from 'ajv';
import buildMakeAttendance from './build';
import dayjs from 'dayjs';

const schema: JSONSchemaType<Attendance> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
    studentId: {
      type: 'string',
      format: 'uuid',
    },
    eventId: {
      type: 'string',
      format: 'uuid',
    },
    timeIn: {
      type: 'string',
      format: 'date-time',
      nullable: true,
    },
    timeOut: {
      type: 'string',
      format: 'date-time',
      nullable: true
    }
  },
  required: [ 'studentId', 'eventId' ],
  additionalProperties: false
};

const validate = makeValidator(schema);
const validator = (attendance: Attendance): Record<string, string> | undefined => {
  const valid = validate(attendance);
  if (!valid) {
    return parseError(validate.errors!);
  }
};

const sanitizer = (attendance: Attendance): Attendance => {
  return attendance;
};

const now = (): string => {
  // NOTE: Can be converted to a helper
  return dayjs().format('YYYY-MM-DDTHH:mm:ssZZ');
};

const makeAttendance = buildMakeAttendance({
  validator,
  sanitizer,
  now
});

export default makeAttendance;


import { JSONSchemaType } from 'ajv';
import { Student } from './types';

import { makeValidator, parseError } from '@interfaces/validator';
import buildMakeStudent from './build';

const schema: JSONSchemaType<Student> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      nullable: true
    },
    idNumber: {
      type: 'number',
      // 8 numbers
      maximum: 99999999,
      minimum: 10000000, 
    },
    idHex: {
      type: 'number',
      maximum: 0xFFFFFFFF,
      minimum: 0x00000000,
    },
    fname: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
    },
    lname: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
    }
  },
  required: [ 'idNumber', 'idHex', 'fname', 'lname' ],
  additionalProperties: false,
};

const validate = makeValidator(schema);
const validateIdNumber = (id: number) => {
  let i = 1, accum = 0;
  while (id > 0) {
    accum += id % 10 * i++;
    id = Math.floor(id / 10);
  }
  return accum % 11 === 0;
};

const validator = (student: Student): Record<string, string> | undefined => {
  let valid = validate(student);
  if (!valid) {
    return parseError(validate.errors!);
  }

  valid = validateIdNumber(student.idNumber);
  if (!valid) {
    return {
      idNumber: 'check'
    };
  }

  return;
};

const sanitizer = (student: Student): Student => {
  if (student.id) {
    student.id = student.id.toString().trim();
  }

  if (student.fname){
    student.fname = student.fname.toString().trim();
  }

  if (student.lname) {
    student.lname = student.lname.toString().trim();
  }

  student.idHex = +student.idHex;
  return student;
};

const makeStudent = buildMakeStudent({
  validator,
  sanitizer
});

export default makeStudent;

import { makeValidator, parseError } from '@interfaces/validator';
import buildMakeUser from './build';
import bcrypt from 'bcrypt';

import { JSONSchemaType } from 'ajv';
import { User } from './types';

const schema: JSONSchemaType<User> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
    username: {
      type: 'string',
      minLength: 8,
      maxLength: 50,
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 60,
      nullable: true,
    },
    hashed: {
      type: 'string',
      maxLength: 60,
      nullable: true
    },
    type: {
      type: 'string',
      nullable: true,
    }
  },
  required: [ 'username' ],
  additionalProperties: false,
};

const validate = makeValidator(schema);

const validator = (user: User): Record<string, string> | undefined => {
  const valid = validate(user);
  if (!valid) {
    return parseError(validate.errors!);
  }
};

const sanitizer = (user: User): User => {
  return user;
};

const hash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const compareHash = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

const makeUser = buildMakeUser({
  validator,
  sanitizer,
  hash,
  compareHash,
});


export default makeUser;


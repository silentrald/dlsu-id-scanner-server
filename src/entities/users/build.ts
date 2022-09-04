import { MakeUserConfig, User, UserEntity } from './types';
import EntityError from '@entities/core/error';

export class UserEntityError extends EntityError {
  constructor(errors: Record<string, string>) {
    super('UserEntityError', errors);
  }
}

const USER_TYPES = [ 'admin', 'temporary' ];

const buildMakeUser = ({
  validator,
  sanitizer,
  hash,
  compareHash
}: MakeUserConfig) => {
  return (user: User): UserEntity => {
    user = sanitizer(user);
    const errors = validator(user);
    if (errors) {
      throw new UserEntityError(errors);
    }

    if (user.type && !USER_TYPES.includes(user.type)) {
      throw new UserEntityError({ type: 'invalid type' });
    }

    return Object.freeze({
      getId: () => user.id,
      getUsername: () => user.username,
      getType: () => user.type,
      getHashed: () => user.hashed,
      
      setType: (uType) => user.type = uType,

      hashPassword: async () => {
        if (!user.password) {
          throw new UserEntityError({ password: 'none' });
        }

        user.hashed = await hash(user.password);
      },

      comparePassword: async (password: string) => {
        if (!user.hashed) {
          throw new UserEntityError({ hashed: 'none' });
        }

        return await compareHash(password, user.hashed);
      }
    } as UserEntity);
  };};

export default buildMakeUser;

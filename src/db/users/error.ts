import DbError from '@db/core/error';

class UserDbError extends DbError {
  constructor(msg: string) {
    super('UserDbError', msg);
  }
}

export default UserDbError;


import DbError from '@db/core/error';


class StudentDbError extends DbError {
  constructor(msg: string) {
    super('StudentDbError', msg);
  }
}

export default StudentDbError;

import DbError from '@db/core/error';


class AttendanceDbError extends DbError {
  constructor(msg: string) {
    super('AttendanceDbError', msg);
  }
}

export default AttendanceDbError;


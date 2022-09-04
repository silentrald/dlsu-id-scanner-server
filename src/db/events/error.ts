import DbError from '@db/core/error';


class EventDbError extends DbError {
  constructor(msg: string) {
    super('EventDbError', msg);
  }
}

export default EventDbError;


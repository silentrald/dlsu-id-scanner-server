import buildUserDb from './pg';
import { pg } from '../core';

const userDb = buildUserDb({
  pg,
  primaryTable: 'users'
});

export default userDb;

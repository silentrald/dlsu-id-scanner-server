import { pg } from '../core';
import buildEventDb from './pg';

const eventDb = buildEventDb({
  pg,
  primaryTable: 'events',
});

export default eventDb;


import { pg } from '../core';
import buildStudentDb from './pg';

const studentDb = buildStudentDb({
  pg,
  primaryTable: 'students'
});

export default studentDb;


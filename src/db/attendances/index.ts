import buildAttendanceDb from './pg';
import { pg } from '@db/core';

const attendanceDb = buildAttendanceDb({
  pg,
  primaryTable: 'attendances',
});

export default attendanceDb;


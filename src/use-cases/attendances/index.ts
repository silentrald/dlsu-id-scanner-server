import { validate as validateId } from 'uuid';

import buildAddAttendanceUseCase from './add-attendance';
import buildUpdateAttendanceUseCase from './update-attendance';
import buildGetAttendancesUseCase from './get-attendances';

import attendanceDb from '@db/attendances';
import studentDb from '@db/students';
import store from '@interfaces/store';
import logger from '@interfaces/logger';

export const getAttendances = buildGetAttendancesUseCase({
  attendanceDb,
  logger,
  validateId,
});

export const addAttendance = buildAddAttendanceUseCase({
  studentDb,
  attendanceDb,
  store,
  logger
});

export const updateAttendance = buildUpdateAttendanceUseCase({
  studentDb,
  attendanceDb,
  store,
  logger
});

export default Object.freeze({
  getAttendances,
  addAttendance,
  updateAttendance
});


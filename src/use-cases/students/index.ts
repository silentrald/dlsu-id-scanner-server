import buildAddStudentUseCase from './add-student';
import studentDb from '@db/students';
import logger from '@interfaces/logger';

/**
 * Adds a student to the database
 */
export const addStudent = buildAddStudentUseCase({ 
  studentDb,
  logger
});

export default Object.freeze({
  addStudent
});

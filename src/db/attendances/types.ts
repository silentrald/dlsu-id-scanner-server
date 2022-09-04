import { Attendance, AttendanceEntity } from '@entities/attendances/types';
import { Student } from '@entities/students/types';

export interface AttendanceDb {
  /**
   * Gets the attendances depending on the eventId
   *
   * @param {string} eventId
   * @returns {Promise<Partial<Attendance & Student>[]>}
   */
  getAttendances: (eventId: string) => Promise<Partial<Attendance & Student>[]>;

  /**
   * Adds an attendance to the database without a timeout
   *
   * @param {AttendanceEntity} attendance without an id
   * @returns {Promise<string>} id of the created attendance
   */
  addAttendance: (attendance: AttendanceEntity) => Promise<string>;

  /**
   * Updates the attendance, uses the userId and eventId
   * as the where query
   *
   * @param {AttendanceEntity} attendance
   * @returns {Promise<boolean>} if the attendance was updated
   */
  updateAttendance: (attendance: AttendanceEntity) => Promise<boolean>;
}

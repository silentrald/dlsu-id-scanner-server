import EntityError from '@entities/core/error';
import { Attendance, AttendanceEntity, MakeAttendanceConfig } from './types';


export class AttendanceEntityError extends EntityError {
  constructor(errors: Record<string, string>) {
    super('AttendanceEntityError', errors);
  }
}

const buildMakeAttendance = ({
  validator,
  sanitizer,
  now,
}: MakeAttendanceConfig) => {
  return (attendance: Attendance): AttendanceEntity => {
    attendance = sanitizer(attendance);
    const errors = validator(attendance);
    if (errors) {
      throw new AttendanceEntityError(errors);
    }

    return Object.freeze({
      getId: () => attendance.id,
      getStudentId: () => attendance.studentId,
      getEventId: () => attendance.eventId,
      getTimeIn: () => attendance.timeIn,
      getTimeOut: () => attendance.timeOut,

      // generateTimeIn: () => {
      //   attendance.timeIn = now();
      // },

      generateTimeOut: () => {
        attendance.timeOut = now();
      },
    } as AttendanceEntity);
  };
};

export default buildMakeAttendance;


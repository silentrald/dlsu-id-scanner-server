import { ARequest, AResponse } from '@adapters/http/types';
import { AttendanceDb } from '@db/attendances/types';
import { Attendance } from '@entities/attendances/types';

import { Store } from '@interfaces/store/types';
import { Logger } from '@interfaces/logger/types';
import { makeResponse } from '@adapters/http/express';
import makeAttendance from '@entities/attendances';

import { StudentDb } from '@db/students/types';

import { AttendanceEntityError } from '@entities/attendances/build';
import AttendanceDbError from '@db/attendances/error';
import UserDbError from '@db/users/error';


const buildUpdateAttendanceUseCase = ({
  studentDb,
  attendanceDb,
  store,
  logger,
}: {
  studentDb: StudentDb;
  attendanceDb: AttendanceDb;
  store: Store;
  logger: Logger;
}) => {
  return async (req: ARequest): Promise<AResponse> => {
    if (!req.isAuth()) {
      return makeResponse({ status: 401 });
    }

    const username = req.getUser()!.getUsername();

    try {
      if (!(await store.existsTempUser(username))) {
        return makeResponse({ status: 403 });
      }

      const eventId = await store.getTempUserEvent(username);
      const student = await studentDb.getStudent({
        idHex: req.getBody().studentId,
      });

      const attendance = makeAttendance({
        studentId: student.getId(),
        eventId
      } as Attendance);
      attendance.generateTimeOut();

      const updated = await attendanceDb.updateAttendance(attendance);
      return makeResponse(updated ? {
        body: {
          student: {
            id: student.getId(),
            idNumber: student.getIdNumber(),
            fname: student.getFname(),
            lname: student.getLname(),
          }
        },
        status: 200
      } : {
        body: 'Not updated',
        status: 400,
      });
    } catch (err) {
      if (err instanceof AttendanceEntityError) {
        return makeResponse({ status: 400, body: err.getErrors() });
      }

      if (err instanceof UserDbError || err instanceof AttendanceDbError) {
        return makeResponse({ status: 400, body: err.message });
      }

      logger.error(err);
      return makeResponse({ status: 500 });
    }
  };
};

export default buildUpdateAttendanceUseCase;


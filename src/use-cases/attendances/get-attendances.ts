import { ARequest, AResponse } from '@adapters/http/types';
import { AttendanceDb } from '@db/attendances/types';
import { Logger } from '@interfaces/logger/types';

import { makeResponse } from '@adapters/http/express';

import AttendanceDbError from '@db/attendances/error';


const buildGetAttendancesUseCase = ({
  attendanceDb,
  logger,
  validateId,
}: {
  attendanceDb: AttendanceDb;
  logger: Logger;
  validateId: (id: string) => boolean;
}) => {
  return async (req: ARequest): Promise<AResponse> => {
    if (!req.isAuth()) {
      return makeResponse({ status: 401 });
    }

    try {
      const { eventId } = req.getParams();
      if (!validateId(eventId)) {
        return makeResponse({ status: 400, body: 'Invalid id' });
      }

      const attendances = await attendanceDb.getAttendances(
        req.getParams().eventId
      );

      return makeResponse({
        body: attendances,
        status: 200,
      });
    } catch (err) {
      if (err instanceof AttendanceDbError) {
        return makeResponse({ status: 400, body: err.message });
      }

      logger.error(err);
      return makeResponse({ status: 500 });
    }
  };
};

export default buildGetAttendancesUseCase;


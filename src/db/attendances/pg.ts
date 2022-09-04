

import { DbClient } from '@db/core/types';
import { AttendanceDb } from './types';
import { Attendance } from '@entities/attendances/types';
import { Student } from '@entities/students/types';

const buildAttendanceDb = ({
  pg,
  primaryTable,
  studentTable,
}: {
  pg: DbClient;
  primaryTable?: string;
  studentTable?: string;
}): AttendanceDb => {
  const table = primaryTable || 'attendances';
  const student = studentTable || 'students';

  const getAttendancesQuery = `
    WITH filtered AS (
      SELECT  *
      FROM    ${table}
      WHERE   event_id=$1
    )
    SELECT
      f.id        as id,
      f.event_id  as "eventId",
      f.time_in   as "timeIn",
      f.time_out  as "timeOut",
      s.fname     as fname,
      s.lname     as lname,
      s.id_number as "idNumber"
    FROM    filtered f
    JOIN    ${student} s
      ON    f.student_id=s.id;
  `;

  const addAttendanceQuery = `
    INSERT INTO ${table}(student_id, event_id)
    VALUES ($1, $2)
    RETURNING id;
  `;

  const updateAttendanceQuery = `
    UPDATE  ${table}
    SET     time_out=$3
    WHERE   student_id=$1
      AND   event_id=$2;
  `;

  return Object.freeze({
    getAttendances: async (eventId) => {
      const { rows } = await pg.query<Partial<Attendance & Student>>(getAttendancesQuery, [ eventId ]);

      return rows;
    },

    addAttendance: async (attendance) => {
      const { rows } = await pg.query<any>(addAttendanceQuery, [
        attendance.getStudentId(),
        attendance.getEventId(),
      ]);

      return rows[0].id;
    },

    updateAttendance: async (attendance) => {
      const { count } = await pg.query<any>(updateAttendanceQuery, [
        attendance.getStudentId(),
        attendance.getEventId(),
        attendance.getTimeOut(),
      ]);

      return count > 0;
    }
  } as AttendanceDb);
};

export default buildAttendanceDb;

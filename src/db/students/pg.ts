import { DbClient } from '@db/core/types';
import { Student } from '@entities/students/types';
import { StudentDb } from './types';

import makeStudent from '@entities/students';
import StudentDbError from './error';

const buildStudentDb = ({
  pg,
  primaryTable
}: {
  pg: DbClient,
  primaryTable?: string
}): StudentDb => {
  const table = primaryTable || 'students';
  const addStudentQuery = `
    INSERT INTO ${table}(id_number, id_hex, fname, lname)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `.trim().split(/\s/).join(' ');

  const getStudentQuery = `
    SELECT
      id,
      id_number AS "idNumber",
      id_hex AS "idHex",
      fname,
      lname
    FROM ${table}
  `.trim().split(/\s/).join(' ');

  return Object.freeze({
    getStudent: async ({ id, idNumber, idHex  }) => {
      let getQuery = getStudentQuery;
      const values: any[] = [];

      if (id) {
        getQuery += ' WHERE id=$1 ';
        values.push(id);
      } else if (idNumber) {
        getQuery += ' WHERE id_number=$1 ';
        values.push(idNumber);
      } else if (idHex) {
        getQuery += ' WHERE id_hex=$1 ';
        values.push(idHex);
      } else {
        throw new StudentDbError('Invalid parameters');
      }
      getQuery += ' LIMIT 1;';

      const { rows, count } = await pg.query<Student>(getQuery, values);
      if (count < 1) {
        throw new StudentDbError('Student not found'); 
      }

      const student = rows[0];
      return makeStudent(student);
    },

    addStudent: async (student) => {
      const { rows } = await pg.query<any>(addStudentQuery, [
        student.getIdNumber(),
        student.getIdHex(),
        student.getFname(),
        student.getLname(),
      ]);

      return rows[0].id;
    }
  } as StudentDb);
};

export default buildStudentDb;

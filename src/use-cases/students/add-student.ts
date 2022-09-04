import { ARequest, AResponse } from '@adapters/http/types';
import { StudentDb } from '@db/students/types';
import { Student } from '@entities/students/types';

import makeStudent from '@entities/students';
import { makeResponse } from '@adapters/http/express';
import { Logger } from '@interfaces/logger/types';

import StudentDbError from '@db/students/error';
import { StudentEntityError } from '@entities/students/build';


const buildAddStudentUseCase = ({
  studentDb,
  logger,
}: {
  studentDb: StudentDb;
  logger: Logger;
}) => {
  return async (req: ARequest): Promise<AResponse> => {
    if (!req.isAuth()) {
      return makeResponse({ status: 401 });
    }
    
    try {
      const student = makeStudent(req.getBody() as Student);
    
      const id = await studentDb.addStudent(student);
      return makeResponse({
        body: id,
        status: 201
      });
    } catch (err) {
      if (err instanceof StudentEntityError) {
        return makeResponse({ body: err.getErrors(), status: 400 });
      } else if (err instanceof StudentDbError) {
        return makeResponse({ body: err.message, status: 400 });
      }

      logger.error(err);
      return makeResponse({ status: 500 });
    }
  };
};

export default buildAddStudentUseCase;

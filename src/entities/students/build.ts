import EntityError from '../core/error';
import { MakeStudentConfig, Student, StudentEntity } from './types';

export class StudentEntityError extends EntityError {
  constructor(errors: Record<string, string>) {
    super('StudentEntityError', errors);
  }
}

const buildMakeStudent = ({ validator, sanitizer }: MakeStudentConfig) => {
  return (student: Student): StudentEntity => {
    student = sanitizer(student);
    const errors = validator(student);
    if (errors) {
      throw new StudentEntityError(errors);
    }

    const hexString = student.idHex.toString(16);

    return Object.freeze({
      getId: () => student.id, 
      getIdNumber: () => student.idNumber,
      getIdHex: () => student.idHex,
      getFname: () => student.fname,
      getLname: () => student.lname,

      getIdHexString: () => hexString
    });
  };
};

export default buildMakeStudent;

import { StudentEntity } from '@entities/students/types';

interface GetStudent {
  id?: string;
  idNumber?: number;
  idHex?: number;
}

export interface StudentDb {
  /**
   * Gets a student from the database
   *
   * @param {Object} params
   * @param {string} params.id Unique identifier
   * @param {number} params.idNumber DLSU id number
   * @param {number} params.idHex RFC tag in DLSU id
   * @returns {StudentEntity} student entity
   */
  getStudent: (params: GetStudent) => Promise<StudentEntity>;

  /**
   * Adds a student from the database
   *
   * @param {StudentEntity} student
   */
  addStudent: (student: StudentEntity) => Promise<string>;
}

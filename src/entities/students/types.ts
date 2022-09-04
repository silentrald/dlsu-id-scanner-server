
export interface Student {
  id?: string;
  idNumber: number;
  idHex: number;
  fname: string;
  lname: string;
}

export interface StudentEntity {
  getId: () => string | undefined;
  // The students id number (eg. 118xxxxx)
  getIdNumber: () => number;
  
  // The hex number stored in the RFC tag
  // on the id converted to an int
  getIdHex: () => number;
  getFname: () => string;
  getLname: () => string;

  /**
   * @returns The hex string conversion of the idHex
   * */
  getIdHexString: () => string;
}

export interface MakeStudentConfig {
  validator: (s: Student) => Record<string, string> | undefined;
  sanitizer: (s: Student) => Student;
}

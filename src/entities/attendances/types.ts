
export interface Attendance {
  id?: string;
  studentId: string;
  eventId: string;
  timeIn?: string;
  timeOut?: string;
}

export interface AttendanceEntity {
  getId: () => string | undefined;
  getStudentId: () => string;
  getEventId: () => string;
  getTimeIn: () => string;
  getTimeOut: () => string;

  // generateTimeIn: () => void;
  generateTimeOut: () => void;
}

export interface MakeAttendanceConfig {
  validator: (a: Attendance) => Record<string, string> | undefined;
  sanitizer: (a: Attendance) => Attendance;
  now: () => string;
}

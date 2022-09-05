import { SqlStatements } from '@migrations/core/types';

const TABLE = 'attendances';

const attendanceMigrations: SqlStatements = {
  up: `
  CREATE TABLE IF NOT EXISTS ${TABLE} (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id  UUID        NOT NULL,
    event_id    UUID        NOT NULL,
    time_in     TIMESTAMPTZ NOT NULL DEFAULT now(),
    time_out    TIMESTAMPTZ,
    CONSTRAINT ${TABLE}_unique UNIQUE(student_id, event_id)
  );
  `,

  down: `DROP TABLE IF EXISTS ${TABLE};`,

  ins: '',

  del: `DELETE FROM ${TABLE};`,
};

export default attendanceMigrations;


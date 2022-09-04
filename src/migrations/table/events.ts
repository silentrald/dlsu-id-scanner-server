import { SqlStatements } from '@migrations/core/types';

const TABLE = 'events';

const eventMigrations: SqlStatements = {
  up: `
  CREATE TABLE IF NOT EXISTS ${TABLE} (
    id          UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(100)  NOT NULL,
    max         INT           NOT NULL,
    time_start  TIMESTAMP     NOT NULL,
    time_end    TIMESTAMP
  );
  `,

  down: `DROP TABLE IF EXISTS ${TABLE};`,

  ins: '',

  del: `DELETE FROM ${TABLE};`,
};

export default eventMigrations;

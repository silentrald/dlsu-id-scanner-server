import { SqlStatements } from 'migrations/core/types';

const TABLE = 'students';

const studentMigrations: SqlStatements = {
  up: `
  CREATE TABLE IF NOT EXISTS ${TABLE} (
    id        UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_number INT         NOT NULL UNIQUE,
    id_hex    BIGINT      NOT NULL UNIQUE,
    fname     VARCHAR(50) NOT NULL,
    lname     VARCHAR(50) NOT NULL
  );
  `,
  
  down: `DROP TABLE IF EXISTS ${TABLE};`,

  ins: '',

  del: `DELETE FROM ${TABLE}`
};

export default studentMigrations;


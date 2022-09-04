import { SqlStatements } from '@migrations/core/types';
import bcrypt from 'bcrypt';

const TABLE = 'users';

const isProd = process.env.NODE_ENV === 'production';

const userMigrations: SqlStatements = {
  up: `
  CREATE TABLE IF NOT EXISTS ${TABLE} (
    id          UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
    username    VARCHAR(50)   UNIQUE NOT NULL,
    password    VARCHAR(60)   NOT NULL
  );
  `,

  down: `DROP TABLE IF EXISTS ${TABLE}`,

  ins: isProd ? '' : `
  INSERT INTO ${TABLE}(username, password)
  VALUES ('username', '${bcrypt.hashSync('password', 10)}');
  `,

  del: `DELETE FROM ${TABLE}`,
};

export default userMigrations;


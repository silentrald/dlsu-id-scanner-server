// Responsible for setting up the database
import userMigration from '@migrations/table/users';

import studentMigration from '@migrations/table/students';
import eventMigration from '@migrations/table/events';
import attendanceMigrations from '@migrations/table/attendances';

const migrations = [
  userMigration,
  studentMigration,
  eventMigration,
  attendanceMigrations
];

const migrate = (cmd: 'up' | 'ins' | 'del' | 'down'): string => {
  if (cmd === 'del' || cmd === 'down') {
    migrations.reverse();
  }

  let query = '';
  for (const migration of migrations) {
    query += migration[cmd] + '\n';
  }

  if (cmd === 'del' || cmd === 'down') {
    migrations.reverse();
  }

  return query;
};

export default migrate;

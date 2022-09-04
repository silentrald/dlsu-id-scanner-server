import { DbClient } from '@db/core/types';
import makeUser from '@entities/users';
import { User } from '@entities/users/types';
import UserDbError from './error';
import { UserDb } from './types';


const buildUserDb = ({
  pg, primaryTable
}: {
  pg: DbClient;
  primaryTable: string;
}): UserDb => {
  const table = primaryTable;

  const getUserQuery = `
    SELECT
      id,
      username,
      password
    FROM ${table}
  `.trim().split(/\s/).join(' ');

  return Object.freeze({
    getUser: async ({ id, username }) => {
      let getQuery = getUserQuery;
      const values: any[] = [];

      if (id) {
        getQuery += ' WHERE id=$1 ';
        values.push(id);
      } else if (username) {
        getQuery += ' WHERE username=$1 ';
        values.push(username);
      } else {
        throw new UserDbError('Invalid parameters');
      }

      getQuery += ' LIMIT 1;';

      const { rows, count } = await pg.query<User>(getQuery, values);
      if (count < 1) {
        throw new UserDbError('User not found');
      }

      const row = rows[0];
      return makeUser({
        id: row.id!,
        username: row.username!,
        hashed: row.password!
      });
    }
  } as UserDb);
};

export default buildUserDb;

import { DbClient } from '@db/core/types';
// import { EventEntity } from '@entities/events/types';
import { EventDb } from './types';
// import EventDbError from './error';

const buildEventDb = ({
  pg,
  primaryTable,
}: {
  pg: DbClient;
  primaryTable?: string;
}): EventDb => {
  const table = primaryTable || 'events';
  const existsEventQuery = `
    SELECT EXISTS(
      SELECT  1
      FROM    ${table}
      WHERE   id=$1
    ) as exists;
  `;

  const addEventQuery = `
    INSERT INTO ${table}(name, max, time_start, time_end)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;

  return Object.freeze({
    existsEvent: async (id) => {
      const { rows } = await pg.query<any>(existsEventQuery, [ id ]);
      return rows[0].exists;
    },

    addEvent: async (event) => {
      const { rows } = await pg.query<any>(addEventQuery, [
        event.getName(),
        event.getMax(),
        event.getTimeStart(),
        event.getTimeEnd()
      ]);

      return rows[0].id;
    },
  } as EventDb);
};

export default buildEventDb;

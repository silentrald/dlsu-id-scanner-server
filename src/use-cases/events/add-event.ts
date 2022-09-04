import { ARequest, AResponse } from '@adapters/http/types';
import { EventDb } from '@db/events/types';
import { Event } from '@entities/events/types';
import { Logger } from '@interfaces/logger/types';

import { makeResponse } from '@adapters/http/express';
import makeEvent from '@entities/events';


const buildAddEventUseCase = ({
  eventDb,
  logger,
}: {
  eventDb: EventDb;
  logger: Logger
}) => {
  return async (req: ARequest): Promise<AResponse> => {
    if (!req.isAuth()) {
      return makeResponse({ status: 401 });
    }

    try {
      const event = makeEvent(req.getBody() as Event);

      const id = await eventDb.addEvent(event);
      return makeResponse({
        body: id,
        status: 201,
      });
    } catch (err) {
      logger.error(err);
      return makeResponse({ status: 500 });
    }
  };
};

export default buildAddEventUseCase;


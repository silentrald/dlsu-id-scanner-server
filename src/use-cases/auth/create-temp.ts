import { ARequest, AResponse } from '@adapters/http/types';
import { Logger } from '@interfaces/logger/types';
import { Store } from '@interfaces/store/types';

import { makeResponse } from '@adapters/http/express';
import makeUser from '@entities/users';
import { EventDb } from '@db/events/types';


const buildCreateTempAuthUseCase = ({
  eventDb,
  store,
  logger,
}: {
  eventDb: EventDb,
  store: Store,
  logger: Logger
}) => {
  return async (req: ARequest): Promise<AResponse> => {
    if (!req.isAuth()) {
      return makeResponse({ status: 401 });
    }

    if (req.getUser()!.getType() !== 'admin') {
      return makeResponse({ status: 403 });
    }

    try {
      const { username, password, eventId } = req.getBody();

      if (await store.existsTempUser(username)) {
        return makeResponse({
          status: 400,
          body: 'User Already Exists'
        });
      }

      if (!(await eventDb.existsEvent(eventId))) {
        return makeResponse({
          status: 400,
          body: 'Event not found'
        });
      }

      const user = makeUser({
        username, password,
        type: 'temporary'
      });
      await user.hashPassword();
      await store.setTempUser(user, eventId);

      return makeResponse({ status: 201 });
    } catch (err) {
      logger.error(err);
      return makeResponse({ status: 500 });
    }
  };
};

export default buildCreateTempAuthUseCase;


import { ARequest, AResponse } from '@adapters/http/types';
import { UserDb } from '@db/users/types';
import { Logger } from '@interfaces/logger/types';

import { makeResponse } from '@adapters/http/express';
import UserDbError from '@db/users/error';

/**
 * Admin Login
 */
const buildLoginAuthUseCase = ({
  userDb,
  logger,
}: {
  userDb: UserDb,
  logger: Logger
}) => {
  return async (req: ARequest): Promise<AResponse> => {
    if (req.isAuth()) {
      return makeResponse({ status: 403 });
    }

    try {
      const { username, password } = req.getBody();

      const user = await userDb.getUser({ username });
      const same = await user.comparePassword(password);
      if (!same) {
        logger.warn(`Attempted login to ${user.getId()}: ${user.getUsername()}`);
        return makeResponse({ status: 401 });
      }

      user.setType('admin');
      req.setUser(user);
      return makeResponse({});
    } catch (err) {
      if (err instanceof UserDbError) {
        return makeResponse({ status: 401 });
      }
      
      logger.error(err);
      return makeResponse({ status: 500 });
    }
  };
};

export default buildLoginAuthUseCase;


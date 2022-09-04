import { ARequest, AResponse } from '@adapters/http/types';
import { Logger } from '@interfaces/logger/types';

import { makeResponse } from '@adapters/http/express';

const buildLogoutAuthUseCase = ({
  logger,
}: {
  logger: Logger
}) => {
  return async (req: ARequest): Promise<AResponse> => {
    if (!req.isAuth()) {
      return makeResponse({ status: 401 });
    }

    try {
      await req.clearUser();
      return makeResponse({ status: 200 });
    } catch (err) {
      logger.error(err);
      return makeResponse({ status: 500 });
    }
  };
};

export default buildLogoutAuthUseCase;


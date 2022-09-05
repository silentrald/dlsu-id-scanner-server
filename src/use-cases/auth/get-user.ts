import { ARequest, AResponse } from '@adapters/http/types';

import { makeResponse } from '@adapters/http/express';

const buildGetUserAuthUseCase = () => {
  return async (req: ARequest): Promise<AResponse> => {
    if (!req.isAuth()) {
      return makeResponse({ status: 401 });
    }

    const user = req.getUser()!;
    return makeResponse({
      body: {
        user: {
          id: user.getId(),
          username: user.getUsername(),
          type: user.getType()
        }
      },
      status: 200
    });
  };
};

export default buildGetUserAuthUseCase;


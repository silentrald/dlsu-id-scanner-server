import makeUser from '@entities/users';

import type { UserType } from '@entities/users/types';
import { Request } from 'express';
import { ARequest, AResponseConfig } from './types';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      username: string;
      type: UserType;
    }
  }
}

export const adaptRequest = (req: Request): ARequest => {
  const logout = () => {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  };

  return Object.freeze({
    getBody: () => {
      return req.body as Record<string, any>;
    },

    getQuery: () => {
      return req.query as Record<string, string | string[]>;
    },

    getParams: () => {
      return req.params as Record<string, string>;
    },

    getUser: () => {
      if (!req.session.user) {
        return;
      }

      const user = req.session.user!;
      return makeUser({
        id: user.id,
        username: user.username,
        type: user.type
      });
    },

    setUser: (user) => {
      req.session.user = {
        id: user.getId()!,
        username: user.getUsername(),
        type: user.getType()!
      };
    },

    clearUser: async () => {
      await logout();
    },

    isAuth: () => {
      return !!(req.session && req.session.user);
    }
  } as ARequest);
};

export const makeResponse = (req: AResponseConfig) => {
  return Object.freeze({
    getBody: () => req.body,
    getStatus: () => req.status || 200,
    getContentType: () => req.contentType || 'application/json'
  });
};

export default adaptRequest;

import { UserEntity } from '@entities/users/types';

export interface ARequest {
  getBody: () => Record<string, any>;
  getQuery: () => Record<string, string | string[]>;
  getParams: () => Record<string, string>;

  // Session Handling
  getUser: () => UserEntity | undefined;
  setUser: (user: UserEntity) => void;
  clearUser: () => Promise<void>;
  isAuth: () => boolean;
}

export interface AResponseConfig {
  body?: any;
  status?: number;
  contentType?: string;
}

export interface AResponse {
  getBody: () => any,
  getStatus: () => number;
  getContentType: () => string;
}

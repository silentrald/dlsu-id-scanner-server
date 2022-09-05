import buildLoginAuthUseCase from './login';
import buildLogoutAuthUseCase from './logout';
import buildCreateTempAuthUseCase from './create-temp';
import buildLoginTempAuthUseCase from './login-temp';
import buildGetUserAuthUseCase from './get-user';

import userDb from '@db/users';
import eventDb from '@db/events';

import logger from '@interfaces/logger';
import store from '@interfaces/store';

export const loginAuth = buildLoginAuthUseCase({
  userDb,
  logger
});

export const logoutAuth = buildLogoutAuthUseCase({
  logger,
});

export const createTempAuth = buildCreateTempAuthUseCase({
  eventDb,
  store,
  logger,
});

export const loginTempAuth = buildLoginTempAuthUseCase({
  store,
  logger,
});

export const getUser = buildGetUserAuthUseCase();

export default Object.freeze({
  loginAuth,
  logoutAuth,
  createTempAuth,
  loginTempAuth,
  getUser,
});

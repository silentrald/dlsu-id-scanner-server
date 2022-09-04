import makeUser from '@entities/users';
import Redis from 'ioredis';
import { Store } from './types';

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: +(process.env.REDIS_PORT || 6379),
});

const TEMP_USER = 'tmpuser:';

const store: Store = {
  getTempUser: async (username) => {
    const data = await redis.get(`${TEMP_USER}${username}`);
    if (!data) {
      return null;
    }

    const json = JSON.parse(data);
    return makeUser({
      username: username,
      hashed: json.password,
      type: 'temporary',
    });
  },

  existsTempUser: async (username) => {
    return (await redis.exists(`${TEMP_USER}${username}`)) > 0;
  },

  getTempUserEvent: async (username) => {
    const data = await redis.get(`${TEMP_USER}${username}`);
    if (!data) {
      return null;
    }

    return JSON.parse(data).eventId;
  },

  setTempUser: async (user, eventId) => {
    const json = {
      password: user.getHashed(),
      eventId
    };
    await redis.set(`${TEMP_USER}${user.getUsername()}`, JSON.stringify(json));
  },
};

export default Object.freeze(store);

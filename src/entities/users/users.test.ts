import makeUser from '.';
import { v4 as uuidv4 } from 'uuid';
import { makeString } from '@helpers/string';
import { UserEntityError } from './build';

describe('Testing UserEntity', () => {
  describe('Success', () => {
    test('All Fields (Min Fields)', async () => {
      const id = uuidv4();

      const user = makeUser({
        id,
        username: 'username',
        password: 'password',
      });

      expect(user.getId()).toEqual(id);
      expect(user.getUsername()).toEqual('username');
      
      // Validate the password
      await user.hashPassword();
      const same = user.comparePassword('password');
      expect(same).toBeTruthy();
    });

    test('Max Fields', async () => {
      const id = uuidv4();
      const username = makeString(50);
      const password = makeString(60);

      const user = makeUser({
        id,
        username,
        password
      });

      expect(user.getId()).toEqual(id);
      expect(user.getUsername()).toEqual(username);

      await user.hashPassword();
      const same = user.comparePassword(password);
      expect(same).toBeTruthy();
    });

    test('Empty fields', async () => {
      const user = makeUser({
        username: 'username'
      });

      expect(user.getId()).toBeFalsy();
      expect(user.getUsername()).toEqual('username');
    });
  });

  describe('Fail', () => {
    test('Min fields', () => {
      try {
        makeUser({
          username: 'usernam',
          password: 'passwor',
        });
      } catch (err) {
        if (!(err instanceof UserEntityError)) {
          throw err;
        }

        expect(err.getErrors()).toEqual(expect.objectContaining({
          username: 'minLength',
          password: 'minLength'
        }));
      }
    });

    test('Max fields', () => {
      try {
        makeUser({
          username: makeString(51),
          password: makeString(61),
          hashed: makeString(61),
        });
      } catch (err) {
        if (!(err instanceof UserEntityError)) {
          throw err;
        }

        expect(err.getErrors()).toEqual(expect.objectContaining({
          username: 'maxLength',
          password: 'maxLength',
          hashed: 'maxLength',
        }));
      }
    });

    test('No password to hash', async () => {
      const user = makeUser({ username: 'username' });

      try {
        await user.hashPassword();
      } catch (err) {
        if (!(err instanceof UserEntityError)) {
          throw err;
        }

        expect(err.getErrors()).toEqual(expect.objectContaining({
          password: 'none'
        }));
      }
    });

    test('Invalid Password', async () => {
      const user = makeUser({
        username: 'username',
        password: 'password',
      });

      await user.hashPassword();
      const same = await user.comparePassword('another_password');
      expect(same).toBeFalsy();
    });

    test('No hash', async () => {
      const user = makeUser({
        username: 'username',
        password: 'password',
      });

      try {
        await user.comparePassword('password');
      } catch (err) {
        if (!(err instanceof UserEntityError)) {
          throw err;
        }

        expect(err.getErrors()).toEqual(expect.objectContaining({
          hashed: 'none'
        }));
      }
    });
  });
});

import makeStudent from '.';
import { StudentEntityError } from './build';

import { v4 as uuidv4 } from 'uuid';
import { makeString } from '@helpers/string';

describe('Testing StudentEntity', () => {
  
  describe('Success', () => {

    test('All Fields', () => {
      const id = uuidv4();

      const user = makeStudent({
        id,
        idNumber: 11800003,
        idHex: 0xffffffff,
        fname: 'first',
        lname: 'last'
      });

      expect(user.getId()).toEqual(id);
      expect(user.getIdNumber()).toEqual(11800003);
      expect(user.getIdHex()).toEqual(0xffffffff);
      expect(user.getIdHexString()).toEqual('ffffffff');
      expect(user.getFname()).toEqual('first');
      expect(user.getLname()).toEqual('last');
    });
  
    test('Not required fields', () => {
      const user = makeStudent({
        idNumber: 11800003,
        idHex: 0xffffffff,
        fname: 'first',
        lname: 'last'
      });

      expect(user.getId()).toBeFalsy();
      expect(user.getIdNumber()).toEqual(11800003);
      expect(user.getIdHex()).toEqual(0xffffffff);
      expect(user.getIdHexString()).toEqual('ffffffff');
      expect(user.getFname()).toEqual('first');
      expect(user.getLname()).toEqual('last');
    });
  });

  describe('Fail', () => {
    test('Empty fields', () => {
      try {
        makeStudent({} as any);
      } catch (err) {
        if (!(err instanceof StudentEntityError)) {
          throw err;
        }

        expect(err.getErrors()).toEqual(expect.objectContaining({
          idNumber: 'required',
          idHex: 'required',
          fname: 'required',
          lname: 'required'
        }));
      }
    });

    test('Invalid types', () => {
      try {
        makeStudent({
          id: 0,
          idNumber: 'asdf',
          idHex: 'asdf',
          fname: 0,
          lname: 0,
        } as any);
      } catch (err) {
        if (!(err instanceof StudentEntityError)) {
          throw err;
        }

        expect(err.getErrors()).toEqual(expect.objectContaining({
          id: 'type',        
          idNumber: 'type',
          idHex: 'type',
          fname: 'type',
          lname: 'type'
        }));
      }
    });

    test('Min fail', () => {
      try {
        makeStudent({
          idNumber: 9999999,
          idHex: -1,
          fname: '',
          lname: '',
        } as any);
      } catch (err) {
        if (!(err instanceof StudentEntityError)) {
          throw err;
        }

        expect(err.getErrors()).toEqual(expect.objectContaining({
          idNumber: 'minimum',
          idHex: 'minimum',
          fname: 'minLength',
          lname: 'minLength'
        }));
      }
    });

    test('Max Fail', () => {
      try {
        makeStudent({
          idNumber: 100000000,
          idHex: 0x100000000,
          fname: makeString(51),
          lname: makeString(51),
        } as any);
      } catch (err) {
        if (!(err instanceof StudentEntityError)) {
          throw err;
        }
        expect(err.getErrors()).toEqual(expect.objectContaining({
          idNumber: 'maximum',
          idHex: 'maximum',
          fname: 'maxLength',
          lname: 'maxLength'
        }));
      }
    });

    test('Invalid Format', () => {
      try {
        makeStudent({
          id: 'something',
          idNumber: 11800003,
          idHex: 0xffffffff,
          fname: 'hello',
          lname: 'hi',
        });
      } catch (err) {
        if (!(err instanceof StudentEntityError)) {
          throw err;
        }
        
        expect(err.getErrors()).toEqual(expect.objectContaining({
          id: 'format',
        }));
      }
    });

    test('Invalid Id Number', () => {
      try {
        makeStudent({
          idNumber: 11800000,
          idHex: 0xffffffff,
          fname: 'hello',
          lname: 'hi'
        });
      } catch (err) {
        if (!(err instanceof StudentEntityError)) {
          throw err;
        }

        expect(err.getErrors()).toEqual(expect.objectContaining({
          idNumber: 'check'
        }));
      }
    });
  });
});


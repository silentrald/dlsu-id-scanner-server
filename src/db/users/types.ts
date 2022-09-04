import { UserEntity } from '@entities/users/types';

interface GetUserParams {
  id?: string;
  username?: string;
}

export interface UserDb {
  /**
   * Returns a user from the database
   *
   * @param {Object} params
   * @param {string | undefined} params.id 
   * @param {string | undefined} params.username
   * @returns {Promise<UserEntity>} returns the user
   **/
  getUser: (params: GetUserParams) => Promise<UserEntity>;
}

import { UserEntity } from '@entities/users/types';

export interface Store {
  /**
   * Gets the logged in user in the store
   *
   * @param {string} key
   * @param {Promise<UserEntity | null>} user 
   */
  // getUser: (key: string) => Promise<UserEntity | null>;
  
  /**
   * Sets the user in the store session
   */
  // setUser: (key: string, user: UserEntity) => Promise<void>;

  /**
   * Gets the temporary user in the store
   *
   * @param {string} username
   * @returns {Promise<string>} value
   */
  getTempUser: (username: string) => Promise<UserEntity | null>;

  /**
   * Checks if the temp user already exists
   *
   * @param {string} username
   * @returns {Promise<boolean>} if the user exists
   */
  existsTempUser: (username: string) => Promise<boolean>;

  /**
   * Gets the event id of the temp user
   *
   * @param {string} username
   * @returns {string} eventId
   */
  getTempUserEvent: (username: string) => Promise<string | null>;

  /**
   * Sets the temp user in the store
   *
   * @param {UserEntity} user
   * @param {string} eventId
   */
  setTempUser: (user: UserEntity, eventId: string) => Promise<void>;
}

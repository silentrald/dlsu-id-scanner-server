
export type UserType = 'admin' | 'temporary'

export interface User {
  id?: string;
  username: string;
  password?: string;
  hashed?: string;
  type?: UserType;
}

export interface UserEntity {
  getId: () => string | undefined;
  getUsername: () => string;
  getType: () => UserType | undefined;
  getHashed: () => string | undefined;

  setType: (uType: UserType) => void;

  /**
   * Hashes the password field
   *
   * @returns {Promise<void>}
   */
  hashPassword: () => Promise<void>;
  
  /**
   * Compare the password to the hash value if they are the same
   *
   * @param {string} password
   * @return {Promise<boolean>} if they are the same
   */
  comparePassword: (password: string) => Promise<boolean>;
}

export interface MakeUserConfig {
  validator: (u: User) => Record<string, string> | undefined;
  sanitizer: (u: User) => User;
  hash: (password: string) => Promise<string>;
  compareHash: (password: string, hash: string) => Promise<boolean>;
}



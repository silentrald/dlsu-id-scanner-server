

class DbError extends Error {
  constructor(name: string, msg: string) {
    super(`${name}: ${msg}`);
    this.name = name;
  }
}

export default DbError;

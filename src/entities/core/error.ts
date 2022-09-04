

class EntityError extends Error {
  protected errors: Record<string, string> = {};

  constructor(name: string, errors: Record<string, string>) {
    super(`${name}: ${JSON.stringify({errors}, '\n' as any, 2)}`);
    this.name = name;
    this.errors = errors;
  }

  public getErrors(): Record<string, string> {
    return this.errors;
  }
}

export default EntityError;

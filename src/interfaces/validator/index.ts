import Ajv, { ErrorObject, JSONSchemaType } from 'ajv';
const ajv = new Ajv({ allErrors: true, coerceTypes: false });
require('ajv-formats')(ajv);

export const makeValidator = <T>(schema: JSONSchemaType<T>) => {
  return ajv.compile(schema);
};

export const parseError = (errors: ErrorObject[]): Record<string, string> => {
  const parsed: Record<string, string> = {};
  for (const error of errors) {
    if (error.keyword === 'required') {
      const key = error.params.missingProperty;
      parsed[key] = 'required';
    } else {
      const key = error.instancePath.substring(1);
      parsed[key] = error.keyword;
    }
  }

  return parsed;
};

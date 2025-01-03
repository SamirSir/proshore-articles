import { Response } from 'express';
import { ArraySchema, ObjectSchema, StringSchema } from 'joi';

class RequestValidator {
  private static instance: RequestValidator;
  private constructor() {}

  public static get(): RequestValidator {
    if (!RequestValidator.instance) {
      RequestValidator.instance = new RequestValidator();
    }
    return RequestValidator.instance;
  }

  public check(schema: ObjectSchema | ArraySchema | StringSchema, input: object | string, res: Response) {
    const { error } = schema.validate(input, { abortEarly: false });
    if (error) res.status(400).send(error.message);
  }
}

const requestValidator = RequestValidator.get();

export { requestValidator as RequestValidator };

import { ArraySchema, ObjectSchema, StringSchema } from 'joi';

class RequestValidator {
    public static validate = (schema: ObjectSchema | ArraySchema | StringSchema, input: object | string) => {
        const { value, error } = schema.validate(input, { abortEarly: false, });
        if (error) {
            // generate some logs 
            throw new Error(error.message);
        }
    };
}

export { RequestValidator };

export * from './article.validator';

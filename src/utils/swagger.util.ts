import fs from 'fs';
import _path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

import { appEnvironment, appHostURI, appName } from '../config';

const getDocs = (basePath: string) => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    acc = { ...acc, ...require(`${basePath}/${file}`) };
    return acc;
  }, {});
};

const swaggerRoutesBasePath = _path.resolve('./swagger/routes');
const docsSources = getDocs(swaggerRoutesBasePath);

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${appName} API Documentation`,
      version: '1.0.0',
      description:
        'Comprehensive API documentation for the PROSHORE articles project, providing all endpoints. This documentation aims to guide developers in integrating and utilizing the article management features efficiently.',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {
        name: 'Auth',
        description: 'Auth endpoints',
      },
      {
        name: 'Article',
        description: 'Article endpoints',
      },
    ],
    servers: [
      {
        url: appHostURI,
        description: 'PROSHORE Article APIs base URL',
      },
    ],
    components: {
      parameters: {
        AcceptLanguageHeader: {
          in: 'header',
          name: 'accept-language',
          description: 'Language preference for the response',
          required: false,
          schema: {
            type: 'string',
            example: 'en-US',
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        BasicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the article',
              example: 123,
            },
            userId: {
              type: 'integer',
              description: 'User identifier for the creator of the article',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'Title of the article',
              example: 'Understanding RESTful APIs',
            },
            content: {
              type: 'string',
              description: 'Content of the article',
              example: 'This article explains RESTful APIs...',
            },
            fileMeta: {
              type: 'object',
              description: 'Metadata for the uploaded file',
              properties: {
                path: {
                  type: 'string',
                  description: 'Path where the file is stored',
                  example: '/uploads/articles/article_file.pdf',
                },
                size: {
                  type: 'integer',
                  description: 'File size in bytes',
                  example: 1024,
                },
                encoding: {
                  type: 'string',
                  description: 'File encoding',
                  example: '7bit',
                },
                filename: {
                  type: 'string',
                  description: 'Name of the uploaded file',
                  example: 'article_file.pdf',
                },
                mimetype: {
                  type: 'string',
                  description: 'MIME type of the file',
                  example: 'application/pdf',
                  enum: ['application/pdf', 'image/png', 'image/jpeg'],
                },
                fieldname: {
                  type: 'string',
                  description: 'Name of the field in the form',
                  example: 'file',
                },
                destination: {
                  type: 'string',
                  description: 'Path where the file is stored',
                  example: '/uploads',
                },
                originalname: {
                  type: 'string',
                  description: 'Original file name before uploading',
                  example: 'article_file.pdf',
                },
              },
            },
            fileData: {
              type: 'string',
              format: 'binary',
              description: 'The actual file content (base64 encoded)',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Article creation timestamp',
              example: '2025-01-01T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Article last updated timestamp',
              example: '2025-01-01T13:00:00Z',
            },
          },
        },
      },
    },
    paths: docsSources,
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const optionsSwaggerUI = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: `${appHostURI}/swagger.json`,
        name: `PROSHORE Article Swagger UI: ${appEnvironment}`,
      },
    ],
  },
};

console.info(`Swagger UI is available at ${appHostURI}/swagger`);
export { optionsSwaggerUI, swaggerSpec };

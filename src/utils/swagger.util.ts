import fs from "fs";
import _path from "path";
import swaggerJSDoc from "swagger-jsdoc";

import { appEnvironment, appHostURI, appName } from "../config";

const baseRoutes = _path.resolve("./swagger/routes");
const getPathRoutes = (path: string) => `${baseRoutes}${path}`;

const getDocs = (basePath: string, getPath: Function) => {
    console.info(`Swagger UI is available at ${appHostURI}/swagger`);
    console.info(`Swagger API JSON Doc is available at ${appHostURI}/swagger.json`);

    return fs.readdirSync(basePath).reduce((acc, file) => {
        const data = require(getPath(`/${file}`));
        acc = { ...acc, ...data, };
        return acc;
    }, {});
};

const docsSources = getDocs(baseRoutes, getPathRoutes);

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: `Api ${appName} Documentation`,
            version: "1.0.0",
            description: 'API documentation for the project',
        },
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
            {
                name: "Auth",
                description: "Auth endpoints"
            },
            {
                name: "Article",
                description: "Article endpoints"
            }],
        servers: [
            {
                url: appHostURI,
                description: "PROSHORE Article APIs base URL",
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
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
                BasicAuth: {
                    type: 'http',
                    scheme: 'basic'
                }
            },
            schemas: {
                Article: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "Unique identifier for the article",
                            example: 123,
                        },
                        userId: {
                            type: "integer",
                            description: "User identifier for the creator of the article",
                            example: 1,
                        },
                        title: {
                            type: "string",
                            description: "Title of the article",
                            example: "Understanding RESTful APIs",
                        },
                        content: {
                            type: "string",
                            description: "Content of the article",
                            example: "This article explains RESTful APIs...",
                        },
                        fileMeta: {
                            type: "object",
                            description: "Metadata for the uploaded file",
                            properties: {
                                path: {
                                    type: "string",
                                    description: "Path where the file is stored",
                                    example: "/uploads/articles/article_file.pdf",
                                },
                                size: {
                                    type: "integer",
                                    description: "File size in bytes",
                                    example: 1024,
                                },
                                encoding: {
                                    type: "string",
                                    description: "File encoding",
                                    example: "7bit",
                                },
                                filename: {
                                    type: "string",
                                    description: "Name of the uploaded file",
                                    example: "article_file.pdf",
                                },
                                mimetype: {
                                    type: "string",
                                    description: "MIME type of the file",
                                    example: "application/pdf",
                                    enum: ["application/pdf", "image/png", "image/jpeg"],
                                },
                                fieldname: {
                                    type: "string",
                                    description: "Name of the field in the form",
                                    example: "file",
                                },
                                destination: {
                                    type: "string",
                                    description: "Path where the file is stored",
                                    example: "/uploads",
                                },
                                originalname: {
                                    type: "string",
                                    description: "Original file name before uploading",
                                    example: "article_file.pdf",
                                },
                            },
                        },
                        fileData: {
                            type: "string",
                            format: "binary",
                            description: "The actual file content (base64 encoded)",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Article creation timestamp",
                            example: "2025-01-01T12:00:00Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Article last updated timestamp",
                            example: "2025-01-01T13:00:00Z",
                        },
                    },
                },
            }
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
                name: `PROSHORE Article Swagger UI: ${appEnvironment} `,
            },
        ],
    },
};

export { optionsSwaggerUI, swaggerSpec };

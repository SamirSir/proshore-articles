import fs from "fs";
import _path from "path";
import swaggerJSDoc from "swagger-jsdoc";

import { appEnvironment, appHostURI, appName } from "../config";

const baseRoutes = _path.resolve("./swagger/routes");
const getPathRoutes = (path: string) => `${baseRoutes}${path}`;

const getDocs = (basePath: string, getPath: Function) => {
    console.info(`Swagger UI is available at ${appHostURI}/swagger`);

    return fs.readdirSync(basePath).reduce((acc, file) => {
        const data = require(getPath(`/${file}`));
        acc = {
            ...acc,
            ...data,
        };
        return acc;
    }, {});
};

const docsSources = getDocs(baseRoutes, getPathRoutes);

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.1",
        servers: [
            {
                url: `${appHostURI}`,
                description: "PROSHORE Article Swagger UI",
            },
        ],
        components: {
            securitySchemes: {
                // BearerAuth: {
                //   type: "http",
                //   scheme: "bearer",
                //   bearerFormat: "JWT",
                // },
                // ApiKeyAuth: {
                //     type: 'apiKey',
                //     in: 'header',
                //     name: 'secret-id',
                // },
                BasicAuth: {
                    type: 'http',
                    scheme: 'basic'
                }
            },
            parameters: {
            },
        },
        info: {
            title: `Api ${appName} Documentation`,
            version: "1.0.0",
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

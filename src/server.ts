import 'module-alias/register';
import cors from 'cors';
import express from 'express'
import morgan from 'morgan';
// import swaggerUI from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';

import { articleRouter } from './routes';
import { optionsSwaggerUI, swaggerSpec } from './utils';
import {
    appHost,
    appPort,
    appCorsWhitelist,
    Database,
    swaggerBasicAuth,
} from './config';


class Server {
    expressApp: express.Application;

    constructor() {
        this.expressApp = express();
        this.configuration();
    }

    private configuration() {
        this.expressApp.set('port', appPort);
        this.expressApp.use(cors(this.corsOptions));
        this.expressApp.use(express.json({ limit: '50mb' }));
        this.expressApp.use(express.urlencoded({ limit: '50mb', extended: true }));
        this.expressApp.use(morgan('dev'));

        // API Routes
        this.expressApp.use('/api/v1/articles', articleRouter);

        // Swagger
        this.expressApp.get(
            '/swagger.json',
            basicAuth({
                users: { admin: swaggerBasicAuth.password },
                challenge: true,
            }),
            (req, res) => {
                res.setHeader('Context-Type', 'application/json');
                res.send(swaggerSpec);
            }
        );

        // this.expressApp.use(
        //     '/swagger',
        //     basicAuth({
        //         users: { admin: swaggerBasicAuth.password },
        //         challenge: true,
        //     }),
        //     swaggerUI.serve
        // );
        // this.expressApp.get(
        //     '/swagger',
        //     swaggerUI.setup(swaggerSpec, optionsSwaggerUI)
        // );

        // // Error Handler
        // this.expressApp.use(errorHandler.genericErrorHandler);
        // this.expressApp.use(errorHandler.methodNotAllowed);
        // this.expressApp.use(errorHandler.notFound);
    }

    private corsOptions: cors.CorsOptions = {
        origin: function (origin, callback) {
            if (!origin || appCorsWhitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('CORS not allowed !!'));
            }
        },
        optionsSuccessStatus: 200,
        credentials: true,
    };

    private async connectDB() {
        try {
            await Database.connect();
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    }

    public start() {
        this.connectDB();
        this.expressApp.listen(this.expressApp.get('port'), () =>
            console.info(`🚀 Server is running at ${appHost}:${this.expressApp.get('port')}`)
        );
    }
}

const server = new Server();
server.start();
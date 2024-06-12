import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mainRouter from './routes';

export default class Server {

    expressInstance: express.Express;

    constructor() {

        this.expressInstance = express();
        this.middlewareSetup();
        this.routingSetup();

    }

    private middlewareSetup() {
        this.expressInstance.use(compression());
        this.expressInstance.use(helmet());
        this.expressInstance.use(cors());
        this.expressInstance.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
        this.expressInstance.use(bodyParser.json({limit: '200mb'}));

    }

    private routingSetup() {
        let router = new mainRouter().router;
        this.expressInstance.use('/', router);
    }

}
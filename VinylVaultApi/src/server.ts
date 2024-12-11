import http from 'http';
import express from 'express';
import './helpers/config/logging';
import 'reflect-metadata';
import * as dotenv from 'dotenv';

import { loggingHandler } from './helpers/middleware/loggingHandler';
import { corsHandler } from './helpers/middleware/corsHandler';
import { routeNotFound } from './helpers/middleware/routeNotFound';
import { SERVER } from './helpers/config/config';
import { defineRoutes } from './modules/routes';
import { InversifyExpressServer } from 'inversify-express-utils';

// import  { MongoClient, ServerApiVersion } from "mongodb";
// import db_conn from "./config/db.config";

import MainController from './controllers/main';
import { PartyController } from './controllers/partyController';
import container from './iocContainer';

const server = new InversifyExpressServer(container);

server.setConfig((application: express.Application) => {
    application.use(express.json());
});

export const application = express();


// const client = new MongoClient(db_conn.DB_CONN_STRING,
//     {
//         autoSelectFamily: true,
//         autoSelectFamilyAttemptTimeout: 200,
//         serverSelectionTimeoutMS: 10000,
// });



export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    dotenv.config();

    logging.info('---------------------------------------------------');
    logging.info('Starting Server...');
    logging.info('---------------------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.info('---------------------------------------------------');
    logging.info('Logging & Configuration');
    logging.info('---------------------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.info('---------------------------------------------------');
    logging.info('Define Controller Routing');
    logging.info('---------------------------------------------------');
    defineRoutes([MainController, PartyController], application);

    logging.info('---------------------------------------------------');
    logging.info('Define Controller Routing');
    logging.info('---------------------------------------------------');
    application.use(routeNotFound);

    logging.info('---------------------------------------------------');
    logging.info('Start Server');
    logging.info('---------------------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.port, async () => {
        logging.info('---------------------------------------------------');
        logging.info(
            'Server is running: ' + SERVER.hostname + ':' + SERVER.port
        );
        // await client.connect();
        logging.info('---------------------------------------------------');
    });
};

export const Shutdown = async (callback: any) =>
    httpServer && httpServer.close(callback) // && await client.close(); 

Main();
// export { client };

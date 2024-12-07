import http from 'http';
import express from 'express';
import './config/logging';
import 'reflect-metadata';

import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER } from './config/config';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/main';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
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
    defineRoutes([MainController], application);

    logging.info('---------------------------------------------------');
    logging.info('Define Controller Routing');
    logging.info('---------------------------------------------------');
    application.use(routeNotFound);

    logging.info('---------------------------------------------------');
    logging.info('Start Server');
    logging.info('---------------------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.port, () => {
        logging.info('---------------------------------------------------');
        logging.info(
            'Server is running: ' + SERVER.hostname + ':' + SERVER.port
        );
        logging.info('---------------------------------------------------');
    });
};

export const Shutdown = (callback: any) =>
    httpServer && httpServer.close(callback);

Main();

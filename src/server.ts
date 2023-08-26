import http, { Server } from 'http';
import { Application } from 'express';

import App from './app';
import ConnectDatabase from './config/database';
import logger from './config/logger';
import { PORT } from './config';

const app = new App().app;

const server: Server = http.createServer(app as Application);

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
}

const startServer = async (): Promise<void> => {
    try {
        await ConnectDatabase();

        server.listen(PORT, () => logger.info(`App listening at PORT: http://localhost:${PORT}`));

        process.on('SIGTERM', () => {
            logger.info('SIGTERM received');
            exitHandler();
        });

        process.on('SIGINT', () => {
            logger.info('SIGINT received');
            exitHandler();
        });

        process.on('uncaughtException', (error) => {
            logger.error('Uncaught Exception:', error);
            exitHandler();
        });

        process.on('unhandledRejection', (reason) => {
            logger.error('Unhandled Rejection:', reason);
            exitHandler();
        });
    } catch (error) {
        logger.error("\nError: App failed to start\n", error);
        process.exit(1);
    }
}

startServer();
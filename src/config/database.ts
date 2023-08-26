import mongoose from 'mongoose';
import { MONGODB_URL } from '.';
import logger from './logger';

mongoose.connection.once('open', () => logger.info('Connected to Database Server'));
mongoose.connection.on('error', (err: Error) => logger.error(err.message));

async function ConnectDatabase(): Promise<void> {
    try {
        const URL: string = MONGODB_URL || 'mongodb://localhost:27017/';

        await mongoose.connect(URL)
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

export default ConnectDatabase;
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import httpStatus from 'http-status';
import mongoSanitize from 'express-mongo-sanitize';
import passport from 'passport';

import { limiter } from './config/rateLimiter';
import { setupPassport } from './config/passport';
import { configureSession } from './config/session';
import configureMorgan from './config/morgan';
import { errorAPIHandler } from './middlewares/error.middleware';
import router from './routes/v1/';
import ErrorResponse from './utils/errorResponse';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.configure();
  }

  private configure(): void {
    this.setupMiddleware();
    this.setupPassport();
    this.setupLogging();
    this.setupRoutes();
    this.setup404Page();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(helmet()); // Adds security headers
    this.app.use(cors()); // Enables Cross-Origin Resource Sharing
    this.app.options('*', cors()); // Cross-origin resource sharing for all routes
    this.app.use(mongoSanitize()); // Prevents SQL injection
    this.app.use(hpp()); // HTTP Param Pollution
    this.app.use(limiter); // Limit queries per 15 minutes
    this.app.use(compression()); // Compress the HTTP responses sent.
    this.app.use(express.json()); // Enable parsing JSON payload in the request body
    this.app.use(express.urlencoded({ extended: false })); // Enable parsing URL
  }

  private setupPassport(): void {
    setupPassport();
    this.app.use(configureSession());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private setupLogging(): void {
    configureMorgan(this.app)
  }

  private setupRoutes(): void {
    this.app.use('/v1', router);
  }

  private setup404Page(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(new ErrorResponse('Not found', httpStatus.NOT_FOUND));
    });
  }

  private setupErrorHandling(): void {
    this.app.use(errorAPIHandler); 
  }
}

export default App;
import express from 'express';
import morgan from 'morgan';
import { ENV } from './index';

const configureMorgan = (app: express.Application) => {
  if (ENV === 'development') {
    app.use(morgan('dev'));
  } else if (ENV === 'test') {
    app.use(morgan('tiny'))
  }
  else {
    app.use(morgan('combined'));
  }
}

export default configureMorgan;
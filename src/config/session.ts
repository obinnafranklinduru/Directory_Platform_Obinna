import session from 'express-session';
import MongoStore from 'connect-mongo';

export const configureSession = () => {
  return session({
    secret: process.env.SESSION_SECERT || '',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL, ttl: 24 * 60 * 60 }),
  });
};
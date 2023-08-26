import { version } from '../../package.json';
import { PORT } from '../config';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Directory Platform API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://opensource.org/license/mit-0/',
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
};

export default swaggerDef;
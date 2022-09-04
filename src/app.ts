require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import { getFiles } from './helpers/files';
import logger from './interfaces/logger';
import { isProd } from 'config';

const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = +(process.env.PORT || 5000);

// Redis Session
import { redis } from './interfaces/store/redis';
import session, { SessionOptions } from 'express-session';
import connectRedis from 'connect-redis';

const EXPIRES = 1000 * 60 * 20; // 20 Minutes
const RedisStore = connectRedis(session);

const store = new RedisStore({ client: redis });

const SESSION_OPT: SessionOptions = {
  store,
  secret: process.env.SESSION_SECRET || 'super-secret-session',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd,
    httpOnly: isProd,
    sameSite: true,
    maxAge: EXPIRES,
  },
  rolling: true,
};

// JS Doc
const options = {
  explorer: true,
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ID Scanner API',
      version: '1.0.0',
    },
    servers: [
      { url: '/api' },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid'
        }
      }
    }
  },
  apis: getFiles('./src/api', 'src/api'),
};
const openapiSpecification = swaggerJsDoc(options);

app.use(require('morgan')(isProd ? 'combined' : 'dev', {
  stream: {
    write: (msg: string) => {
      logger.info(msg);
    }
  }
}));
app.use(session(SESSION_OPT));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

for (const method of [
  'get', 'post'
]) {
  for (const file of getFiles(
    path.join(__dirname, 'api', method)).map(file => `/${file.slice(0, -3)}`)
  ) {
    const route = `/api${file.replace(/_/g, ':').replace(/\\/g, '/')}`;
    app[method](route.endsWith('/index') ?
      route.slice(0, -6) :
      route, require(`./api/${method}${file}`).default
    );
  }
}

app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(openapiSpecification));

app.listen(PORT, HOST, () => {
  logger.info(`Running at http://localhost:${PORT}`);
});

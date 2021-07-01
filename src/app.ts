import util from 'util';

import config from 'config';
import express, {
  Response,
  Request,
  NextFunction,
  json,
  urlencoded,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import { Container } from 'typescript-ioc';
import { v4 as uuidV4 } from 'uuid';

import { AuthenticationError } from './domain/errors/AuthenticationError';
import { RegisterRoutes } from './routes';
import { Logger } from './service/Logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const expressBunyanLogger = require('@chaudhryjunaid/express-bunyan-logger');

// Bind config to the injection container so we can do @InjectValue(config.Logger.name)
Container.bindName('config').to(config.util.loadFileConfigs());

export const app = express();

// Read sent json payloads
app.use(urlencoded({ extended: true }));
app.use(json());

// Request ID tracking
app.use((req: Request, res: Response, next: NextFunction) => {
  const uuid = uuidV4();
  (req as unknown as { id?: string }).id = uuid;
  res.setHeader('x-request-id', uuid);
  next();
});

const webLoggerConfig = Logger.resolveBunyanConfig(config.get('logger.web'));
app.use(
  expressBunyanLogger({
    ...webLoggerConfig,
    genReqId(req: Request) {
      return (req as unknown as { id: string }).id;
    },
  }),
);
app.use(expressBunyanLogger.errorLogger(webLoggerConfig));

app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
});

RegisterRoutes(app);

/** Error handling. */
app.use(function errorHandler(
  err: unknown,
  _: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (err instanceof AuthenticationError) {
    return send(401, { message: err.message });
  } else if (err instanceof ValidateError) {
    return send(400, { details: err.fields, message: 'Validation Failed' });
  } else if (err instanceof Error) {
    return send(500, { message: 'Internal Server Error' });
  }

  function send<J extends Record<string, unknown>>(code: number, body: J) {
    const finalBody: J & { _debug?: Record<string, unknown> } = { ...body };
    if (process.env.NODE_ENV !== 'production') {
      if (err instanceof Error) {
        finalBody._debug = {
          message: err.message,
          stack: err.stack,
        };
      } else {
        finalBody._debug = {
          inspect: util.inspect(err),
        };
      }
    }
    res.status(code).json(finalBody);
  }

  next();
});

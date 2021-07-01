import { LoggerConfig } from '../src/service/Logger';

export type Config = {
  logger: {
    service: LoggerConfig;
    web: LoggerConfig;
  };
};

const config: Config = {
  logger: {
    service: {
      level: 'trace',
      name: 'example/service',
    },
    web: {
      level: 'error',
      name: 'example/web',
    },
  },
};

export default config;

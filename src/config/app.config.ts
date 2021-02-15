require('./dotenv-options');

export const APP_CONFIG = {
  LOGGER: {
    LEVEL: process.env.APP_LOGGER_LEVEL || 'debug',
    PATH: process.env.APP_LOGGER_PATH || './../log/',
  },
  PORT: process.env.APP_LOGGER_PORT || '50052',
  ADDRESS: process.env.APP_LOGGER_HOST || '0.0.0.0',
};

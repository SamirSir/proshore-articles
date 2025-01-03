import * as dotenv from 'dotenv';
import sequelize from 'sequelize';

import { EnvironmentEnum, SortEnum } from '../enums';

dotenv.config();

const mustExist = <T>(value: T | undefined, name: string): T => {
  if (!value) {
    console.error(`Missing Config: ${name} !!!`);
    process.exit(1);
  }
  return value;
};

export const appName = mustExist(process.env.APP_NAME, 'APP_NAME'),
  appEnvironment = mustExist(process.env.APP_ENVIRONMENT as EnvironmentEnum, 'APP_ENVIRONMENT'),
  appHost = mustExist(process.env.APP_HOST, 'APP_HOST'),
  appPort = +mustExist(+process.env.APP_PORT!, 'APP_PORT'),
  appHostURI = mustExist(process.env.APP_HOST_URI, 'APP_HOST_URI'),
  appCorsWhitelist = mustExist(process.env.APP_CORS_WHITE_LIST!, 'APP_CORS_WHITE_LIST').split(','),
  db = {
    host: mustExist(process.env.DB_HOST, 'DB_HOST'),
    port: +mustExist(+process.env.DB_PORT!, 'DB_PORT'),
    username: mustExist(process.env.DB_USER, 'DB_USER'),
    password: mustExist(process.env.DB_PASSWORD, 'DB_PASSWORD'),
    name: mustExist(process.env.DB_NAME, 'DB_NAME'),
    dialect: mustExist(process.env.DB_DIALECT, 'DB_DIALECT') as sequelize.Dialect,
    logging: false,
    timezone: 'utc',
    maxPool: 10,
    minPool: 1,
  },
  jwtAuthSecret = {
    access: mustExist(process.env.JWT_AUTH_SECRET_ACCESS, 'JWT_AUTH_SECRET_ACCESS'),
  },
  /** Pagination */
  pageDefaultOffset = 0,
  pageMinLimit = 10,
  pageMaxLimit = 100,
  pageEventMaxLimit = 4000,
  /** Sort-Order */
  defaultOrder = SortEnum.desc,
  defaultSort = 'updatedAt',
  validFileMimeType = ['image/jpeg', 'image/png', 'application/pdf', 'application/json'],
  swaggerBasicAuth = {
    username: mustExist(process.env.SWAGGER_BASIC_AUTH_USERNAME, 'SWAGGER_BASIC_AUTH_USERNAME'),
    password: mustExist(process.env.SWAGGER_BASIC_AUTH_PASSWORD, 'SWAGGER_BASIC_AUTH_PASSWORD'),
  };

export * from './database.config';

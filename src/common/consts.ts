import { CacheManagerOptions } from '@nestjs/common';

export * from './email.consts';

export const SQL_DATE_FORMAT = 'YYYY-MM-DD';
export const SQL_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const MOMENT_DATE_FORMAT = 'dddd, MMMM Do';
export const MOMENT_TIME_FORMAT = 'h:mm a';
export const MOMENT_DATETIME_FORMAT = 'dddd, MMMM Do, h:mm a';

export const DEFAULT_CACHE_CONFIG_OPTS: CacheManagerOptions = {
  ttl: 3,
  max: 15000
};

export const ROLE = {
  USER: 1,
  BUSINESS: 2,
  ADMIN: 3
};

export const WAIT = {
  S3_ACTION: 1000
};

export const PERMISSIONS_SCOPES = ['app.create', 'app.read', 'app.update', 'app.delete', 'app.list', 'app.all'];

export const AUTH_OPTS = {
  SALT_ROUNDS: 10
};

export const CREATE_HMAC_ALG = 'sha256';

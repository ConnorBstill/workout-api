import * as moment from 'moment';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export function generateRandomString(length: number = 64): string {
  let str = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  const charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return str;
}

export function generateRandomNumber(length: number = 64): string {
  let str = '';
  const characters = '0123456789';
  const charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return str;
}

export function getArgs(): any {
  const args = {};
  process.argv.slice(2, process.argv.length).forEach(arg => {
    // Long args
    if (arg.slice(0, 2) === '--') {
      const longArg = arg.split('=');
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    }

    // Flags
    else if (arg[0] === '-') {
      const flags = arg.slice(1, arg.length).split('');
      flags.forEach(flag => {
        args[flag] = true;
      });
    }
  });

  return args;
}

export function fixFloatingPointNumber(float: number): number {
  return +parseFloat(float.toString()).toFixed(2);
}

export const wait = (ms: number = 1000): Promise<{}> =>
  of()
    .pipe(delay(ms))
    .toPromise();

export const WHITESPACE_REGEX = /\s+|\\n/gim;

export const copyObj = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export function encodeBase64(rawString: string): string {
  return Buffer.from(rawString).toString('base64');
}

export function decodeBase64(encodedString: string): string {
  return Buffer.from(encodedString, 'base64').toString('ascii');
}

export function coerceBoolean(val: any): boolean {
  if (typeof val === 'string') {
    if (val === 'true' || val === '1') {
      return true;
    } else {
      return false;
    }
  }

  if (typeof val === 'number') {
    if (val === 1) {
      return true;
    } else {
      return false;
    }
  }

  if (typeof val === 'boolean') {
    return val;
  }
}

export const createMySqlDateEntered = (): string => moment().format('YYYY-MM-DD HH:mm:ss');

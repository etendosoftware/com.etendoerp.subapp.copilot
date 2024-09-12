import { decode as atob, encode as btoa } from 'base-64'
import { References } from './references';
import { Global } from '../../lib/GlobalConfig';

export const isDevelopment = () => {
  return process.env.NODE_ENV === "production" ? false : true;
};

export class RestUtils {
  static fetch = async (uri: string, options: RequestInit | undefined) => {
    options = options || {};
    options.headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };
    options.headers = {
      'Authorization': `Bearer ${Global.token}`,
      ...(options.headers || {}),
    };
    return fetch(uri, options);
  };
}

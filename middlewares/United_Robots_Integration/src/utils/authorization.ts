import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

import { CLIENT_SECRET_KEY_CI, SECRET_KEY_CI } from '../constants';

dotenv.config();

/**
 * verifyToken function
 * this function verify a token playload.
 *
 * @param {string} token - the token to be verified.
 * @returns returns an empty string or a string with the verified token.
 *
 * @example
 * # Usage
 * ```ts
 * const result = verifyToken(token);
 * ```
 *
 * # Result
 * ```ts
 *{
 *  "sub":"Ai!vJAV9waz3P^twpKPzD5eL&NtZ$!R!t8V@J45gSSy#fBR^2GeKeL&NtZ$jqE6aS4NBNuuRov5Q4jiatKwiPoG77wQW7J%vKAj&o##oVkX@5Vvu!^wgQU47S@&RNjvGHf3Gdvg",
 *  "name":"Verified Token",
 *  "iat":1516459022
 *}
 * ```
 */
export const verifyToken = (token: string): string | JwtPayload => {
  const SECRET_KEY = process.env.SECRET_KEY || SECRET_KEY_CI;
  try {
    return JSON.stringify(jwt.verify(token, SECRET_KEY));
  } catch {
    console.info('Invalid bearer token');
    return '';
  }
};

/**
 * validateToken function
 * this function verify a token playload.
 *
 * @param {string} bearerToken - The Bearer token.
 * @returns returns an false if the Bearer token is invalid and true if valid
 *
 * @example
 * # Usage
 * ```ts
 * const result = validateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBaSF2SkFWOXdhejNQXnR3cEtQekQ1ZUwmTnRaJGpxRTZhUzROQk51dVJvdjVRNGppYXReUiF0OFZASjQ1Z1NTeSNmQlJeMkdlS0t3aVBvRzc3d1FXN0oldktBaiZvIyNvVmtYQDVWdnUhXndnUVU0N1NAJlJOanZHSGYzR2R2ZyIsIm5hbWUiOiJMZWRlQUkgdGVhbSBERVZFTE9QTUVOVCIsImlhdCI6MTUxNtjtKtgmoT181XieVoze0mMh2nE8OTAyMn0.mZ7MI3e96MkJJNBdtj');
 * ```
 *
 * # Result
 * ```ts
 * true
 * ```
 */
export const validateToken = (bearerToken: string): boolean => {
  if (!bearerToken.startsWith('Bearer ')) {
    return false;
  }

  const CLIENT_SECRET_KEY =
    process.env.CLIENT_SECRET_KEY || CLIENT_SECRET_KEY_CI;
  const token = bearerToken.slice(7);

  if (verifyToken(token) === CLIENT_SECRET_KEY) {
    return true;
  }

  return false;
};

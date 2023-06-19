import jwt, { Secret } from 'jsonwebtoken';
import { config } from 'dotenv';

import { HttpError } from './http-error.js';

config();
const accessTokenSecret: Secret | undefined = process.env.ACCESS_TOKEN_SECRET;

export const signAccessToken = (payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, accessTokenSecret as Secret, {
    }, (err, token) => {
      if (err) {
        reject(new HttpError('Internal server error', 500))
      }
      resolve(token as string)
    })
  })
}

export const verifyAccessToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret as Secret, (err, payload) => {
      if (err) {
        const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return reject(new HttpError(message, 401))
      }
      resolve(payload)
    })
  })
}
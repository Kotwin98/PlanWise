import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { HttpError } from './http-error.js';
config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const signAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
            if (err) {
                reject(new HttpError('Internal server error', 500));
            }
            resolve(token);
        });
    });
};
export const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, accessTokenSecret, (err, payload) => {
            if (err) {
                const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return reject(new HttpError(message, 401));
            }
            resolve(payload);
        });
    });
};
//# sourceMappingURL=jwt.js.map
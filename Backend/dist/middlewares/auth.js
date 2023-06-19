import { verifyAccessToken } from '../util/jwt.js';
import { HttpError } from '../util/http-error.js';
export const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(new HttpError('Access token is required', 401));
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(new HttpError('Access token is required', 401));
    }
    await verifyAccessToken(token).then(user => {
        req.user = user;
        next();
    }).catch(e => {
        next(new HttpError(e.message, 401));
    });
};
//# sourceMappingURL=auth.js.map
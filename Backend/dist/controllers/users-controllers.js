import { authSignup, authLogin, authGetUsers } from '../services/auth.services.js';
import { HttpError } from '../util/http-error.js';
export const signup = async (req, res, next) => {
    try {
        const user = await authSignup(req.body);
        res.status(200).json({
            status: true,
            message: 'User created successfully',
            data: user
        });
    }
    catch (e) {
        next(new HttpError(e.message, e.statusCode));
    }
};
export const login = async (req, res, next) => {
    try {
        const data = await authLogin(req.body);
        res.status(200).json({
            status: true,
            message: "Account login successful",
            data
        });
    }
    catch (e) {
        next(new HttpError(e.message, e.statusCode));
    }
};
export const getUsers = async (req, res, next) => {
    try {
        const users = await authGetUsers();
        res.status(200).json({
            status: true,
            message: 'All users',
            data: users
        });
    }
    catch (e) {
        next(new HttpError(e.message, e.statusCode));
    }
};
//# sourceMappingURL=users-controllers.js.map
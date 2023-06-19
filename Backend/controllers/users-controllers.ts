import { Request, Response, NextFunction } from 'express';
import { authSignup, authLogin, authGetUsers } from '../services/auth.services.js';
import { HttpError } from '../util/http-error.js';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await authSignup(req.body);
    res.status(200).json({
      status: true,
      message: 'User created successfully',
      data: user
    })
  }
  catch (e) {
    next(new HttpError(e.message, e.statusCode))
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authLogin(req.body)
    res.status(200).json({
      status: true,
      message: "Account login successful",
      data
    })
  } catch (e) {
      next(new HttpError(e.message, e.statusCode))
  }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await authGetUsers();
    res.status(200).json({
      status: true,
      message: 'All users',
      data: users
    })
  }
  catch (e) {
    next(new HttpError(e.message, e.statusCode))
  }
}
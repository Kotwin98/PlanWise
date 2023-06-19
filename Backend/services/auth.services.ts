import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { signAccessToken } from '../util/jwt.js';
import { HttpError } from '../util/http-error.js';

const prisma = new PrismaClient();

export const authSignup = async (data: any): Promise<any> => {
  const { email } = data;
  data.password = bcrypt.hashSync(data.password, 8);
  let user = prisma.user.create({
    data
  })
  data.accessToken = await signAccessToken(user);

  return data;
}

export const authLogin = async (data: any): Promise<any> => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user) {
    throw new HttpError('User not found', 404)
  }
  const checkPassword = bcrypt.compareSync(password, user.password)
  if (!checkPassword){
    throw new HttpError('Please check your password again', 401)
  } 
  delete user.password
  const accessToken = await signAccessToken(user)
  return { ...user, accessToken }
}

export const authGetUsers = async (): Promise<any[]> => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../model/User';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRespository = getRepository(User);

    const user = await userRespository.findOne({
      where: { email },
    });
    if (!user) throw new AppError('Email or password incorrect !', 401);

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) throw new AppError('Email or password incorrect', 400);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateSessionService;

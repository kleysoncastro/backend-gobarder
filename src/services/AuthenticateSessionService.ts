import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../model/User';
import authConfig from '../config/auth';

interface Resquest {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateSessionService {
  public async execute({ email, password }: Resquest): Promise<Response> {
    const userRespository = getRepository(User);

    const user = await userRespository.findOne({
      where: { email },
    });
    if (!user) throw Error('Email or password incorrect !');

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) throw Error('Email or password incorrect');

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

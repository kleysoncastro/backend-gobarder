import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../model/User';

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

    const token = sign({}, 'ddb9c1251ddac2c863a493d5fd005226', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateSessionService;

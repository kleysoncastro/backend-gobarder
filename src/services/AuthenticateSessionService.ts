import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../model/User';

interface Resquest {
  email: string;
  password: string;
}
interface Response {
  user: User;
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

    return {
      user,
    };
  }
}

export default AuthenticateSessionService;

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../model/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkEmail = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmail) throw new AppError('This email already exists');

    const hashPassword = await hash(password, 7);

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;

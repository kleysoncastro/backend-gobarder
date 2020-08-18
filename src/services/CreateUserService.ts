import { getRepository } from 'typeorm';
import User from '../model/User';

interface Requeste {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Requeste): Promise<User> {
    const usersRepository = getRepository(User);
    const checkEmail = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmail) throw new Error('this email already exists');

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;

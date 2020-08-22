import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../model/User';
import updateConfig from '../config/uploads';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

    if (!user)
      throw new AppError('User not fund, no possible update avatar', 401);

    if (user.avatar) {
      const userAvatarFilePath = path.join(updateConfig.directory, user.avatar);

      const avatarExists = await fs.promises.stat(userAvatarFilePath);
      if (avatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;

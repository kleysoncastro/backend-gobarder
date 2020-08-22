import { startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointiment from '../model/Appointiment';
import AppointimentsRepository from '../repositories/AppointimentsRepository';

import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointimentService {
  appointimentsRepository = getCustomRepository(AppointimentsRepository);

  public async execute({ provider_id, date }: Request): Promise<Appointiment> {
    const appointimentDate = startOfDay(date);

    const findAppointmentSomaDate = await this.appointimentsRepository.findByDate(
      appointimentDate,
    );

    if (findAppointmentSomaDate)
      throw new AppError('This date is not available');

    const appointiment = this.appointimentsRepository.create({
      provider_id,
      date: appointimentDate,
    });

    await this.appointimentsRepository.save(appointiment);
    return appointiment;
  }
}

export default CreateAppointimentService;

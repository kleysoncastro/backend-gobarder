import { startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointiment from '../model/Appointiment';
import AppointimentsRepository from '../repositories/AppointimentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointimentService {
  appointimentsRepository = getCustomRepository(AppointimentsRepository);

  public async execute({ provider, date }: Request): Promise<Appointiment> {
    const appointimentDate = startOfDay(date);

    const findAppointmentSomaDate = this.appointimentsRepository.findByDate(
      appointimentDate,
    );

    if (findAppointmentSomaDate) throw Error('This date is not available');

    const appointiment = this.appointimentsRepository.create({
      provider,
      date: appointimentDate,
    });

    await this.appointimentsRepository.save(appointiment);
    return appointiment;
  }
}

export default CreateAppointimentService;

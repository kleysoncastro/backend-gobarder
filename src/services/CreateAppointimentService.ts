import { startOfDay } from 'date-fns';
import Appointiment from '../model/Appointiment';
import AppointimentsRepository from '../repositories/AppointimentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointimentService {
  private appointimentsRepository: AppointimentsRepository;

  constructor(appointimentsRepository: AppointimentsRepository) {
    this.appointimentsRepository = appointimentsRepository;
  }

  public execute({ provider, date }: Request): Appointiment {
    const appointimentDate = startOfDay(date);

    const findAppointmentSomaDate = this.appointimentsRepository.findByDate(
      appointimentDate,
    );

    if (findAppointmentSomaDate) throw Error('This date is not available');

    const appointiment = this.appointimentsRepository.create({
      provider,
      date: appointimentDate,
    });
    return appointiment;
  }
}

export default CreateAppointimentService;

import { isEqual } from 'date-fns';
import Appointiment from '../model/Appointiment';

interface CreateAppointimentDTO {
  provider: string;
  date: Date;
}
class AppointimentsRepository {
  private appointiments: Appointiment[];

  constructor() {
    this.appointiments = [];
  }

  public create({ provider, date }: CreateAppointimentDTO): Appointiment {
    const appointiment = new Appointiment({ provider, date });
    this.appointiments.push(appointiment);
    return appointiment;
  }

  public findByDate(date: Date): Appointiment | null {
    const findAppointiment = this.appointiments.find(appointiment =>
      isEqual(date, appointiment.date),
    );
    return findAppointiment || null;
  }

  /**
   * appointiments in array this.appointiments = [] list all
   */
  public all() {
    return this.appointiments;
  }
}

export default AppointimentsRepository;

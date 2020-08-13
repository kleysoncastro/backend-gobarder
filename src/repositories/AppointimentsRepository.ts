import { EntityRepository, Repository } from 'typeorm';
import Appointiment from '../model/Appointiment';

@EntityRepository(Appointiment)
class AppointimentsRepository extends Repository<Appointiment> {
  public async findByDate(date: Date): Promise<Appointiment | null> {
    const findAppointiment = await this.findOne({
      where: { date },
    });
    return findAppointiment || null;
  }
}

export default AppointimentsRepository;

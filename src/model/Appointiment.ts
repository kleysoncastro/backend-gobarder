import { uuid } from 'uuidv4';

class Appointiment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointiment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointiment;

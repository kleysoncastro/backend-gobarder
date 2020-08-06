import { uuid } from 'uuidv4';

class Appointiment {
  id: string;

  provider: string;

  date: Date;

  constructor(provier: string, date: Date) {
    this.id = uuid();
    this.provider = provier;
    this.date = date;
  }
}

export default Appointiment;

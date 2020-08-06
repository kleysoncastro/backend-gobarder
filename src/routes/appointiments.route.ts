import { Router } from 'express';
import { startOfDay, parseISO, isEqual } from 'date-fns';
import { uuid } from 'uuidv4';
import Appointiment from '../model/Appointiment';

const appointimentsRoute = Router();

const appointiments: Appointiment[] = [];

appointimentsRoute.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parseDate = startOfDay(parseISO(date));

  const findAppointmentSomaDate = appointiments.find(appoint =>
    isEqual(appoint.date, parseDate),
  );

  if (findAppointmentSomaDate)
    return response.status(400).json({ message: 'This date is not available' });

  const appointiment = new Appointiment(provider, parseDate);
  appointiments.push(appointiment);
  return response.json(appointiment);
});

export default appointimentsRoute;

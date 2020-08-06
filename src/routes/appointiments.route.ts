import { Router } from 'express';
import { startOfDay, parseISO } from 'date-fns';
import AppointimentsRepository from '../repositories/AppointimentsRepository';

const appointimentsRoute = Router();

const appointimentsRepository = new AppointimentsRepository();

appointimentsRoute.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parseDate = startOfDay(parseISO(date));

  const findAppointmentSomaDate = appointimentsRepository.findByDate(parseDate);

  if (findAppointmentSomaDate)
    return response.status(400).json({ message: 'This date is not available' });

  const appointiment = appointimentsRepository.create(provider, parseDate);
  return response.json(appointiment);
});

appointimentsRoute.get('/', (request, response) => {
  const listAppointiment = appointimentsRepository.all();
  return response.json(listAppointiment);
});

export default appointimentsRoute;

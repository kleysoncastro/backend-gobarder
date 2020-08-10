import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointimentsRepository from '../repositories/AppointimentsRepository';
import CreateAppointimentService from '../services/CreateAppointimentService';

const appointimentsRoute = Router();

const appointimentsRepository = new AppointimentsRepository();

appointimentsRoute.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointiment = new CreateAppointimentService(
      appointimentsRepository,
    );

    const appointiment = createAppointiment.execute({
      provider,
      date: parseDate,
    });

    return response.json(appointiment);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

appointimentsRoute.get('/', (request, response) => {
  const listAppointiment = appointimentsRepository.all();
  return response.json(listAppointiment);
});

export default appointimentsRoute;

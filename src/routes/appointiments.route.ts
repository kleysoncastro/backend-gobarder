import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointimentsRepository from '../repositories/AppointimentsRepository';
import CreateAppointimentService from '../services/CreateAppointimentService';
import ensureAthenticate from '../middlewares/ensureAuthenticate';

const appointimentsRoute = Router();
appointimentsRoute.use(ensureAthenticate);

appointimentsRoute.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointiment = new CreateAppointimentService();

    const appointiment = await createAppointiment.execute({
      provider_id,
      date: parseDate,
    });

    return response.json(appointiment);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

appointimentsRoute.get('/', async (request, response) => {
  const appointimentsRepository = getCustomRepository(AppointimentsRepository);
  const listAppointiment = await appointimentsRepository.find();
  return response.json(listAppointiment);
});

export default appointimentsRoute;

import { Router } from 'express';
import AuthenticateSessionService from '../services/AuthenticateSessionService';

const sessionRoute = Router();

sessionRoute.post('/', async (request, response) => {
  try {
    const authenticateSession = new AuthenticateSessionService();

    const { email, password } = request.body;

    const user = await authenticateSession.execute({ email, password });
    delete user.user.password;
    return response.json(user);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default sessionRoute;

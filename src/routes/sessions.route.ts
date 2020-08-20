import { Router } from 'express';
import AuthenticateSessionService from '../services/AuthenticateSessionService';

const sessionRoute = Router();

sessionRoute.post('/', async (request, response) => {
  try {
    const authenticateSession = new AuthenticateSessionService();

    const { email, password } = request.body;

    const { user, token } = await authenticateSession.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user, token });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default sessionRoute;

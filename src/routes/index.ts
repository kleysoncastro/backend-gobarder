import { Router } from 'express';
import appointimentsRoute from './appointiments.route';
import userRouter from './users.routes';
import sessionRoute from './sessions.route';

const routes = Router();

routes.use('/appointments', appointimentsRoute);
routes.use('/users', userRouter);

routes.use('/session', sessionRoute);

export default routes;

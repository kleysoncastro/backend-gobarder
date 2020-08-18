import { Router } from 'express';
import appointimentsRoute from './appointiments.route';
import userRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointimentsRoute);
routes.use('/users', userRouter);

export default routes;

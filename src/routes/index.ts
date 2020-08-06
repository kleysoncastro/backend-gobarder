import { Router } from 'express';
import appointimentsRoute from './appointiments.route';

const routes = Router();

routes.use('/appointments', appointimentsRoute);

export default routes;

import { Router } from 'express';

import EstablishmentController from './app/controllers/EstablishmentController';

const routes = new Router();

routes.get('/', EstablishmentController.store);

export default routes;

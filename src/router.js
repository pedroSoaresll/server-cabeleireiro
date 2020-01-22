import { Router } from 'express';

import EstablishmentController from './app/controllers/EstablishmentController';
import establishmentCreateCommand from './app/commands/establishments/create';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post(
  '/establishments',
  establishmentCreateCommand,
  EstablishmentController.store
);

routes.put(
  '/establishments/:id',
  authMiddleware,
  EstablishmentController.update
);

export default routes;

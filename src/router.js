import { Router } from 'express';

import EstablishmentController from './app/controllers/EstablishmentController';
import establishmentCreateCommand from './app/commands/establishments/create';

const routes = new Router();

routes.post(
  '/establishments',
  establishmentCreateCommand,
  EstablishmentController.store
);

export default routes;

import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import EstablishmentController from './app/controllers/EstablishmentController';
import establishmentCreateCommand from './app/commands/establishments/create';

import CoordinateController from './app/controllers/CoordinateController';
import coordinateCreateCommand from './app/commands/coordinates/create';

import QueueController from './app/controllers/QueueController';

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

routes.get('/coordinates/:coordinate', CoordinateController.index);

routes.post(
  '/coordinates',
  coordinateCreateCommand,
  CoordinateController.store
);

routes.post(
  '/establishments/:id/queue',
  authMiddleware,
  QueueController.update
);

routes.get('/establishments/:id/queue', QueueController.index);

export default routes;

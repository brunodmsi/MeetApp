import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizerController from './app/controllers/OrganizerController';
import SubscriptionController from './app/controllers/SubscriptionController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = new Router();

/**
 * Unauthenticated routes
 */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

/**
 * Authenticated routes
 */
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

/**
 * Meetup CRUD
 */
routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.destroy);

/**
 * Organizers
 */
routes.get('/organizer', OrganizerController.index);

/**
 * User's subscriptions
 */
routes.get('/subscriptions', SubscriptionController.index);

/**
 * User subscribes to meetup
 */
routes.post('/meetups/:id/subscriptions', SubscriptionController.store);

export default routes;

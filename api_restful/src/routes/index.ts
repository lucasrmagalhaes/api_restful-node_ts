import { Router } from 'express';
import itemsRouter from './items.routes';

const routes = Router();

routes.use('/items', itemsRouter);

export default routes;
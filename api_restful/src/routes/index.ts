import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Olá DEV!'});
});

export default routes;
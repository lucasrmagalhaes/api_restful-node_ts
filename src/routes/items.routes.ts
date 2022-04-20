import { Router } from 'express';
import knex from '../database/connection';
import env from '../config/env';

const itemsRouter = Router();

itemsRouter.get('/', async (request, response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `${env.host}:${env.port}/uploads/${item.image}`
        }
    });

    return response.json(serializedItems);
});

export default itemsRouter;
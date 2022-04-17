import { Router } from 'express';
import knex from '../database/connection';

const locationsRouter: Router = Router();

locationsRouter.post('/', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const location: object = {
        image: "fake-image.jpg",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    };

    const newIds: Array<number> = await knex('locations').insert(location);

    const locationId: number = newIds[0];

    const locationItems = items.map((item_id: number) => {
        return {
            item_id,
            location_id: locationId
        }
    });

    await knex('location_items').insert(locationItems);

    return response.json({
        id: locationId,
        ...location
    });
});

export default locationsRouter;
import { Router } from 'express';
import knex from '../database/connection';

const locationsRouter: Router = Router();

locationsRouter.get('/', async (request, response) => {
    const { city, uf, items } = request.query;

    const parsedItems = <any> String(items).split(',').map(item => Number(item.trim()));

    const locations = await knex('locations')
        .join('location_items', 'locations.id', '=', 'location_items.location_id')
        .whereIn('location_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('locations.*');

    return response.json(locations);
});

locationsRouter.get('/:id', async (request, response) => {
    const { id } = request.params;

    const location = await knex('locations').where('id', id).first();

    if (!location) {
        return response.status(400).json({ message: 'Location not found.' });
    }

    const items = await knex('items')
        .join('location_items', 'items.id', '=', 'location_items.item_id')
        .where('location_items.location_id', id)
        .select('items.title');

    return response.json({ location, items });
});

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

    const transaction = await knex.transaction();

    const newIds: Array<number> = await transaction('locations').insert(location);

    const location_id: number = newIds[0];

    if (items?.length) { 
        let itemNotFound: number|undefined = undefined;

        const itemsBd = await transaction('items').select('id');

        const itemsIdBd: Array<number> = itemsBd.map(item => {
            return item.id;
        });
        
        items.forEach((item: number) => {
            if (!itemsIdBd.includes(item)) {
                itemNotFound = item
            }
        });

        if (itemNotFound) {
            transaction.rollback();

            return response.status(400).json({ message: `Item ${itemNotFound} not found!`});
        }

        const locationItems = items.map((item_id: number) => {
            return {
                item_id,
                location_id
            };
        });

        await transaction('location_items').insert(locationItems)
    }

    await transaction.commit();

    return response.json({
        id: location_id,
        ...location
    });
});

export default locationsRouter;
import { Router } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import knex from '../database/connection';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const user = await knex('users').where('email', email).first();

    if (!user) {
        return response.status(400).json({ message: 'Credentials not found.' });
    }

    const comparePassword = compare(password, user.password);

    if (!comparePassword) {
        return response.status(400).json({ message: 'Credentials not found.' });
    }

    const token = sign({}, 'e10adc3949ba59abbe56e057f20f883e', {
        subject: String(user.id),
        expiresIn: '1d'
    });

    return response.json({ user, token });
});

export default sessionsRouter;
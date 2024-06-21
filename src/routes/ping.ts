import { Router } from 'express';

export const pingRouter = Router();

pingRouter.get('/', (req, res) => {
    res.send(true);
});
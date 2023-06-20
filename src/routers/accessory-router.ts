import { Router } from 'express';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { readAccessory } from '@/controllers/accessory-controller';

const accessoryRouter = Router();

accessoryRouter.all('/*', authenticateToken).get('/', readAccessory);

export { accessoryRouter };

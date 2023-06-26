import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { readAccessory } from '@/controllers';

const accessoryRouter = Router();

accessoryRouter.all('/*', authenticateToken).get('/', readAccessory);

export { accessoryRouter };

import { Router } from 'express';
import { vendorSchema } from '@/schemas';
import { validateBody, authenticateToken } from '@/middlewares';
import { createVendor } from '@/controllers';

const vendorRouter = Router();

vendorRouter.all('/*', authenticateToken).post('/', validateBody(vendorSchema), createVendor);

export { vendorRouter };

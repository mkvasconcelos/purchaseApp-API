import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { vendorSchema } from '@/schemas/vendor-schemas';
import { createVendor } from '@/controllers/vendor-controller';

const vendorRouter = Router();

vendorRouter.all('/*', authenticateToken).post('/', validateBody(vendorSchema), createVendor);

export { vendorRouter };

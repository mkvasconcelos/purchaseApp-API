import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { purchaseSchema } from '@/schemas';
import { authenticateToken } from '@/middlewares/authentication-middleware';
import { createPurchase, readPurchase, readPurchaseById } from '@/controllers/purchase-controller';

const purchaseRouter = Router();

purchaseRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(purchaseSchema), createPurchase)
  .get('/', readPurchase)
  .get('/:id', readPurchaseById);

export { purchaseRouter };

import { Router } from 'express';
import { purchaseSchema } from '@/schemas';
import { validateBody, authenticateToken } from '@/middlewares';
import { createPurchase, readPurchase, readPurchaseById } from '@/controllers';

const purchaseRouter = Router();

purchaseRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(purchaseSchema), createPurchase)
  .get('/', readPurchase)
  .get('/:id', readPurchaseById);

export { purchaseRouter };

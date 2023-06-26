import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getApprovalById, getApprovals, updateApproval } from '@/controllers';
import { approvalStatusSchema } from '@/schemas';

const approvalRouter = Router();

approvalRouter
  .all('/*', authenticateToken)
  .get('/', getApprovals)
  .get('/:id', getApprovalById)
  .put('/:id', validateBody(approvalStatusSchema), updateApproval);

export { approvalRouter };

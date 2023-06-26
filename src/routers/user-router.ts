import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getNameUser } from '@/controllers';

const userRouter = Router();

userRouter.all('/*', authenticateToken).get('/', getNameUser);

export { userRouter };

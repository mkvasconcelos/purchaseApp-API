import { Router } from 'express';
import { signInSchema, signUpSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { signUp, signIn } from '@/controllers';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), signIn);
authenticationRouter.post('/sign-up', validateBody(signUpSchema), signUp);

export { authenticationRouter };

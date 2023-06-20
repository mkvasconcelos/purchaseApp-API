import { Router } from 'express';
import { signUp, signIn } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema, signUpSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), signIn);
authenticationRouter.post('/sign-up', validateBody(signUpSchema), signUp);

export { authenticationRouter };

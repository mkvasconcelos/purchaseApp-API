import { Request, Response } from 'express';
import httpStatus from 'http-status';
import authenticationService from '@/services/authentication-service';

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  try {
    await authenticationService.signUp(name, email, password);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.status(httpStatus.CONFLICT).send(error);
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const token = await authenticationService.signIn(email, password);
    return res.status(httpStatus.OK).send({ token });
  } catch {
    return res.status(httpStatus.UNAUTHORIZED).send('Invalid email/password.');
  }
}

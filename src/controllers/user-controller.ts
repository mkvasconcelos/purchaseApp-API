import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import userService from '@/services/user-service';

export async function getNameUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await userService.findNameUser(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

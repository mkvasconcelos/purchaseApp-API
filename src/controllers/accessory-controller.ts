import { Response, Request } from 'express';
import httpStatus from 'http-status';
import accessoryService from '@/services/accessory-service';

export async function readAccessory(req: Request, res: Response) {
  try {
    const result = await accessoryService.readAccessories();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

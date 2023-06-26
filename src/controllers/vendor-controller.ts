import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import vendorService from '@/services/vendor-service';

export async function createVendor(req: AuthenticatedRequest, res: Response) {
  const { codeSap, name, fiscalTaxId, email } = req.body;
  try {
    const result = await vendorService.createVendor(codeSap, name, fiscalTaxId, email);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

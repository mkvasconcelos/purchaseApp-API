import { Response } from 'express';
import httpStatus from 'http-status';
import purchaseService from '@/services/purchase-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function createPurchase(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const {
    type,
    delivery,
    description,
    startContract,
    endContract,
    contract,
    vendorId,
    observation,
    status,
    listItems,
  } = req.body;
  let parts = startContract.split('-');
  const newStartContract = new Date(parts[0], parts[1] - 1, parts[2]);
  parts = endContract.split('-');
  const newEndContract = new Date(parts[0], parts[1] - 1, parts[2]);
  try {
    let totalContract = 0;
    for (let i = 0; i < listItems.length; i++) {
      const { quantity, priceUnit } = listItems[i];
      totalContract += quantity * priceUnit;
    }
    const result = await purchaseService.createPurchase(
      userId,
      type,
      delivery,
      description,
      totalContract,
      newStartContract,
      newEndContract,
      contract,
      vendorId,
      observation,
      status,
    );
    const purchaseId = result.id;
    for (let i = 0; i < listItems.length; i++) {
      const { typeId, ccId, kcId, description, quantity, priceUnit } = listItems[i];
      await purchaseService.createItem(typeId, ccId, kcId, purchaseId, description, quantity, priceUnit);
    }
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    // return res.status(httpStatus.CONFLICT).send(error);
  }
}

export async function readPurchase(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await purchaseService.readPurchase(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    // return res.status(httpStatus.CONFLICT).send(error);
  }
}

export async function readPurchaseById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;
  const newId = parseInt(id);
  try {
    const result = await purchaseService.readPurchaseById(userId, newId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    // return res.status(httpStatus.CONFLICT).send(error);
  }
}

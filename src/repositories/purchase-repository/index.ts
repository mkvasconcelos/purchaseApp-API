import { prisma } from '@/config';
import { Condition, PurchaseRequest, PurchaseStatus, RequestType } from '@prisma/client';

async function createPurchase(
  requesterId: number,
  type: RequestType,
  delivery: Condition,
  description: string,
  totalContract: number,
  startContract: Date,
  endContract: Date,
  contract: string,
  vendorId: number,
  observation: string,
  status: PurchaseStatus,
) {
  return prisma.purchaseRequest.create({
    data: {
      requesterId,
      type,
      delivery,
      description,
      totalContract,
      startContract,
      endContract,
      contract,
      vendorId,
      observation,
      status,
    },
  });
}

async function readPurchase(requesterId: number): Promise<PurchaseRequest[]> {
  return prisma.purchaseRequest.findMany({
    where: {
      requesterId,
    },
  });
}

async function readPurchaseById(requesterId: number, id: number): Promise<PurchaseRequest> {
  return prisma.purchaseRequest.findFirst({
    where: {
      id,
      requesterId,
    },
  });
}

const purchaseRepository = {
  createPurchase,
  readPurchase,
  readPurchaseById,
};

export default purchaseRepository;

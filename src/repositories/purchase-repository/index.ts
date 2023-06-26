import { prisma } from '@/config';
import { Condition, PurchaseRequest, PurchaseStatus, RequestType } from '@prisma/client';

async function createPurchase(
  requesterId: number,
  type: RequestType,
  delivery: Condition,
  totalContract: number,
  startContract: Date,
  endContract: Date,
  vendorId: number,
  observation: string,
  status: PurchaseStatus,
  description: string,
) {
  return prisma.purchaseRequest.create({
    data: {
      requesterId,
      type,
      delivery,
      totalContract,
      startContract,
      endContract,
      vendorId,
      observation,
      status,
      description,
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

// async function readPurchaseById(requesterId: number, id: number): Promise<PurchaseRequest> {
//   return prisma.purchaseRequest.findFirst({
//     where: {
//       id,
//       requesterId,
//     },
//   });
// }

async function readPurchaseById(id: number): Promise<PurchaseRequest> {
  return prisma.purchaseRequest.findFirst({
    where: {
      id,
    },
  });
}

async function readPurchaseByApprover(id: number): Promise<PurchaseByApprover> {
  return prisma.purchaseRequest.findFirst({
    where: {
      id,
    },
    select: { description: true, totalContract: true, requesterId: true, vendorId: true },
  });
}

async function updatePurchase(id: number, status: boolean): Promise<PurchaseRequest> {
  let newStatus: PurchaseStatus;
  if (status) {
    newStatus = PurchaseStatus.Approved;
  } else {
    newStatus = PurchaseStatus.Rejected;
  }
  return prisma.purchaseRequest.update({
    where: {
      id,
    },
    data: { status: newStatus },
  });
}

type PurchaseByApprover = Omit<
  PurchaseRequest,
  'id' | 'type' | 'delivery' | 'startContract' | 'endContract' | 'observation' | 'status' | 'createdAt' | 'updatedAt'
>;

const purchaseRepository = {
  createPurchase,
  readPurchase,
  readPurchaseById,
  readPurchaseByApprover,
  updatePurchase,
};

export default purchaseRepository;

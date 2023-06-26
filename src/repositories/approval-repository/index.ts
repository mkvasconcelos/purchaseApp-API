import { prisma } from '@/config';
import { Approval } from '@prisma/client';

type ApprovalData = Omit<Approval, 'approverId' | 'status' | 'createdAt' | 'updatedAt'>;
type ApprovalNew = Omit<Approval, 'createdAt' | 'updatedAt'>;

async function getApprovals(requesterId: number): Promise<ApprovalData[]> {
  return prisma.approval.findMany({
    where: {
      approverId: requesterId,
      status: false,
    },
    select: {
      purchaseId: true,
    },
  });
}

async function createApproval(approverId: number, purchaseId: number): Promise<ApprovalNew> {
  return prisma.approval.create({
    data: {
      approverId,
      status: false,
      purchaseId,
    },
  });
}

async function getApprovalById(approverId: number, purchaseId: number): Promise<ApprovalNew> {
  return prisma.approval.findFirst({
    where: {
      approverId,
      purchaseId,
    },
  });
}

async function updateApproval(approverId: number, purchaseId: number): Promise<ApprovalNew> {
  return prisma.approval.update({
    where: {
      approverId_purchaseId: { approverId, purchaseId },
    },
    data: {
      status: true,
    },
  });
}

const approvalRepository = {
  getApprovals,
  createApproval,
  getApprovalById,
  updateApproval,
};

export default approvalRepository;

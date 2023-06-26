import { notFoundError } from '@/errors';
import approvalRepository from '@/repositories/approval-repository';
import purchaseRepository from '@/repositories/purchase-repository';
import userRepository from '@/repositories/user-repository';
import vendorRepository from '@/repositories/vendor-repository';

async function getApprovals(requesterId: number) {
  const approvals = await approvalRepository.getApprovals(requesterId);
  const response = [];
  for (let i = 0; i < approvals.length; i++) {
    const purchase = await purchaseRepository.readPurchaseByApprover(approvals[i].purchaseId);
    const vendor = await vendorRepository.findById(purchase.vendorId);
    const user = await userRepository.findById(purchase.requesterId);
    response.push({
      purchaseId: approvals[i].purchaseId,
      vendor: vendor.name,
      description: purchase.description,
      totalContract: purchase.totalContract / 100,
      user: user.name,
    });
  }
  return response;
}

async function getApprovalById(requesterId: number, purchaseId: number) {
  const purchase = await purchaseRepository.readPurchaseById(purchaseId);
  if (!purchase) {
    throw notFoundError();
  }
  if (purchase.requesterId === requesterId) {
    throw notFoundError();
  }
  const response = await approvalRepository.getApprovalById(requesterId, purchase.id);
  if (!response) {
    throw notFoundError();
  }
  return;
}

async function updateApprovals(requesterId: number, purchaseId: number, status: boolean) {
  await approvalRepository.updateApproval(requesterId, purchaseId);
  await purchaseRepository.updatePurchase(purchaseId, status);
  return;
}

const approvalService = {
  getApprovals,
  getApprovalById,
  updateApprovals,
};

export default approvalService;

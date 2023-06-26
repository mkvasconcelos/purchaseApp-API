import { Condition, Item, PurchaseRequest, RequestType } from '@prisma/client';
import purchaseRepository from '@/repositories/purchase-repository';
import itemRepository from '@/repositories/item-repository';
import userRepository from '@/repositories/user-repository';
import vendorRepository from '@/repositories/vendor-repository';
import accessoriesRepository from '@/repositories/acessories-repository';
import approvalRepository from '@/repositories/approval-repository';
import { invalidDataError, notFoundError } from '@/errors';

async function createPurchase(
  requesterId: number,
  type: RequestType,
  delivery: Condition,
  totalContract: number,
  startContract: Date,
  endContract: Date,
  vendorId: number,
  observation: string,
  approverId: number,
  description: string,
): Promise<PurchaseRequest> {
  const purchase = await purchaseRepository.createPurchase(
    requesterId,
    type,
    delivery,
    totalContract,
    startContract,
    endContract,
    vendorId,
    observation,
    'Sent',
    description,
  );
  await approvalRepository.createApproval(approverId, purchase.id);
  return purchase;
}

async function createItem(
  typeId: string,
  ccId: string,
  kcId: string,
  purchaseId: number,
  quantity: number,
  priceUnit: number,
): Promise<Item> {
  const item = await itemRepository.createItem(typeId, ccId, kcId, purchaseId, quantity, priceUnit);
  return item;
}

async function readPurchase(requesterId: number) {
  const purchase = await purchaseRepository.readPurchase(requesterId);
  const response = [];
  for (let i = 0; i < purchase.length; i++) {
    const requester = await userRepository.findById(purchase[i].requesterId);
    const vendor = await vendorRepository.findById(purchase[i].vendorId);
    let formattedDate = `${(purchase[i].createdAt.getMonth() + 1).toString().padStart(2, '0')}/${purchase[
      i
    ].createdAt.getDate()}/${purchase[i].createdAt.getFullYear()}`;
    let formattedTime = `${purchase[i].createdAt.getHours()}:${purchase[i].createdAt.getMinutes()}`;
    const createdAt = `${formattedDate} ${formattedTime}`;
    formattedDate = `${(purchase[i].updatedAt.getMonth() + 1).toString().padStart(2, '0')}/${purchase[
      i
    ].updatedAt.getDate()}/${purchase[i].updatedAt.getFullYear()}`;
    formattedTime = `${purchase[i].updatedAt.getHours()}:${purchase[i].updatedAt.getMinutes()}`;
    const updatedAt = `${formattedDate} ${formattedTime}`;
    response.push({
      id: purchase[i].id,
      requester: requester.name,
      vendor: vendor.name,
      status: purchase[i].status,
      createdAt,
      updatedAt,
    });
  }
  return response;
}

async function readPurchaseById(requesterId: number, id: number) {
  const approval = await approvalRepository.getApprovalById(requesterId, id);
  const purchase = await purchaseRepository.readPurchaseById(id);
  if (!approval) {
    if (purchase.requesterId !== requesterId) {
      throw notFoundError();
    }
  } else if (!purchase) {
    throw invalidDataError([]);
  }
  const item = await itemRepository.readItem(purchase.id);
  const requester = await userRepository.findById(purchase.requesterId);
  const vendor = await vendorRepository.findById(purchase.vendorId);
  let formattedDate = `${(purchase.createdAt.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${purchase.createdAt.getDate()}/${purchase.createdAt.getFullYear()}`;
  let formattedTime = `${purchase.createdAt.getHours()}:${purchase.createdAt.getMinutes()}`;
  const createdAt = `${formattedDate} ${formattedTime}`;
  formattedDate = `${(purchase.updatedAt.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${purchase.updatedAt.getDate()}/${purchase.updatedAt.getFullYear()}`;
  formattedTime = `${purchase.updatedAt.getHours()}:${purchase.updatedAt.getMinutes()}`;
  const updatedAt = `${formattedDate} ${formattedTime}`;
  formattedDate = `${(purchase.startContract.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${purchase.startContract.getDate()}/${purchase.startContract.getFullYear()}`;
  const startContract = `${formattedDate}`;
  formattedDate = `${(purchase.endContract.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${purchase.endContract.getDate()}/${purchase.endContract.getFullYear()}`;
  const endContract = `${formattedDate}`;
  const newItem = [];
  for (let i = 0; i < item.length; i++) {
    const cc = await accessoriesRepository.findCostCenter(item[i].ccId);
    const kc = await accessoriesRepository.findKeyCountry(item[i].kcId);
    const typeItem = await itemRepository.findTypeItem(item[i].typeId);
    newItem.push({
      ...item[i],
      priceUnit: (item[i].priceUnit / 100).toLocaleString('en-US'),
      ccId: cc.name,
      kcId: kc.name,
      typeId: typeItem.name,
    });
  }
  const response = {
    id: purchase.id,
    requester: requester.name,
    type: purchase.type,
    delivery: purchase.delivery,
    totalContract: (purchase.totalContract / 100).toLocaleString('en-US'),
    startContract,
    endContract,
    vendor: vendor.name,
    observation: purchase.observation,
    status: purchase.status,
    createdAt,
    updatedAt,
    listItems: newItem,
  };
  return response;
}

const purchaseService = {
  createPurchase,
  readPurchase,
  readPurchaseById,
  createItem,
};

export default purchaseService;

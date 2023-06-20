import { Condition, Item, PurchaseRequest, PurchaseStatus, RequestType } from '@prisma/client';
import { conflictError } from '@/errors';
import purchaseRepository from '@/repositories/purchase-repository';
import itemRepository from '@/repositories/item-repository';
import userRepository from '@/repositories/user-repository';
import vendorRepository from '@/repositories/vendor-repository';

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
): Promise<PurchaseRequest> {
  const purchase = await purchaseRepository.createPurchase(
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
  );
  return purchase;
}

async function createItem(
  typeId: string,
  ccId: string,
  kcId: string,
  purchaseId: number,
  description: string,
  quantity: number,
  priceUnit: number,
): Promise<Item> {
  const item = await itemRepository.createItem(typeId, ccId, kcId, purchaseId, description, quantity, priceUnit);
  return item;
}

async function readPurchase(requesterId: number) {
  const purchase = await purchaseRepository.readPurchase(requesterId);
  const response = [];
  for (let i = 0; i < purchase.length; i++) {
    // const item = await itemRepository.readItem(purchase[i].id);
    const requester = await userRepository.findById(purchase[i].requesterId);
    const vendor = await vendorRepository.findById(purchase[i].vendorId);
    let formattedDate = `${purchase[i].createdAt.getDate()}/${(purchase[i].createdAt.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${purchase[i].createdAt.getFullYear()}`;
    let formattedTime = `${purchase[i].createdAt.getHours()}:${purchase[i].createdAt.getMinutes()}`;
    const createdAt = `${formattedDate} ${formattedTime}`;
    formattedDate = `${purchase[i].updatedAt.getDate()}/${(purchase[i].updatedAt.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${purchase[i].updatedAt.getFullYear()}`;
    formattedTime = `${purchase[i].updatedAt.getHours()}:${purchase[i].updatedAt.getMinutes()}`;
    const updatedAt = `${formattedDate} ${formattedTime}`;
    response.push({
      id: purchase[i].id,
      requester: requester.name,
      // requesterId: purchase[i].requesterId,
      // type: purchase[i].type,
      // delivery: purchase[i].delivery,
      // description: purchase[i].description,
      // totalContract: purchase[i].totalContract,
      // startContract: purchase[i].startContract,
      // endContract: purchase[i].endContract,
      // contract: purchase[i].contract,
      vendor: vendor.name,
      // observation: purchase[i].observation,
      status: purchase[i].status,
      createdAt,
      updatedAt,
      // listItems: item,
    });
  }
  return response;
}

async function readPurchaseById(requesterId: number, id: number) {
  const purchase = await purchaseRepository.readPurchaseById(requesterId, id);
  const item = await itemRepository.readItem(purchase.id);
  const requester = await userRepository.findById(purchase.requesterId);
  const vendor = await vendorRepository.findById(purchase.vendorId);
  let formattedDate = `${purchase.createdAt.getDate()}/${(purchase.createdAt.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${purchase.createdAt.getFullYear()}`;
  let formattedTime = `${purchase.createdAt.getHours()}:${purchase.createdAt.getMinutes()}`;
  const createdAt = `${formattedDate} ${formattedTime}`;
  formattedDate = `${purchase.updatedAt.getDate()}/${(purchase.updatedAt.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${purchase.updatedAt.getFullYear()}`;
  formattedTime = `${purchase.updatedAt.getHours()}:${purchase.updatedAt.getMinutes()}`;
  const updatedAt = `${formattedDate} ${formattedTime}`;
  item.map((i) => i.priceUnit / 100);
  const response = {
    id: purchase.id,
    requester: requester.name,
    type: purchase.type,
    delivery: purchase.delivery,
    description: purchase.description,
    totalContract: purchase.totalContract / 100,
    startContract: purchase.startContract,
    endContract: purchase.endContract,
    contract: purchase.contract,
    vendor: vendor.name,
    observation: purchase.observation,
    status: purchase.status,
    createdAt,
    updatedAt,
    listItems: item,
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
// export * from './errors';

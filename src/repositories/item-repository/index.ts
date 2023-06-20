import { prisma } from '@/config';
import { Item } from '@prisma/client';

async function createItem(
  typeId: string,
  ccId: string,
  kcId: string,
  purchaseId: number,
  description: string,
  quantity: number,
  priceUnit: number,
): Promise<Item> {
  return prisma.item.create({
    data: {
      typeId,
      ccId,
      kcId,
      purchaseId,
      description,
      quantity,
      priceUnit,
    },
  });
}

async function readItem(purchaseId: number): Promise<Item[]> {
  return prisma.item.findMany({
    where: {
      purchaseId,
    },
  });
}

async function readTypeItem() {
  return prisma.typeItem.findMany({
    select: {
      code: true,
      name: true,
    },
  });
}

const itemRepository = {
  createItem,
  readItem,
  readTypeItem,
};

export default itemRepository;

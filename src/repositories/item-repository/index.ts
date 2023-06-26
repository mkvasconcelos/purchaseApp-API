import { prisma } from '@/config';
import { Item, CostCenter, KeyCountry } from '@prisma/client';

async function createItem(
  typeId: string,
  ccId: string,
  kcId: string,
  purchaseId: number,
  quantity: number,
  priceUnit: number,
): Promise<Item> {
  return prisma.item.create({
    data: {
      typeId,
      ccId,
      kcId,
      purchaseId,
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

async function findTypeItem(code: string) {
  return prisma.typeItem.findFirst({
    where: {
      code,
    },
    select: {
      name: true,
    },
  });
}

const itemRepository = {
  createItem,
  readItem,
  readTypeItem,
  findTypeItem,
};

export default itemRepository;

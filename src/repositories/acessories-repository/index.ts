import { prisma } from '@/config';
import { Condition, PurchaseStatus, RequestType, Vendor } from '@prisma/client';

async function readListOptions() {
  const options = { type: RequestType, delivery: Condition, status: PurchaseStatus };
  return options;
}

async function readCostCenter() {
  return prisma.costCenter.findMany({
    select: {
      code: true,
      name: true,
    },
  });
}

async function readKeyCountry() {
  return prisma.keyCountry.findMany({
    select: {
      code: true,
      name: true,
    },
  });
}

const accessoriesRepository = {
  readListOptions,
  readCostCenter,
  readKeyCountry,
};

export default accessoriesRepository;

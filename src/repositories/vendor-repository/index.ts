import { prisma } from '@/config';
import { Vendor } from '@prisma/client';

async function createVendor(codeSap: string, name: string, fiscalTaxId: string, email: string): Promise<Vendor> {
  return prisma.vendor.create({
    data: {
      codeSap,
      name,
      fiscalTaxId,
      email,
    },
  });
}

async function findById(id: number) {
  return prisma.vendor.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });
}

async function readVendor() {
  return prisma.vendor.findMany({});
}

const vendorRepository = {
  createVendor,
  findById,
  readVendor,
};

export default vendorRepository;

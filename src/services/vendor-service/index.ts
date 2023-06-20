import { Vendor } from '@prisma/client';
import vendorRepository from '@/repositories/vendor-repository';

async function createVendor(codeSap: string, name: string, fiscalTaxId: string, email: string): Promise<Vendor> {
  const purchase = await vendorRepository.createVendor(codeSap, name, fiscalTaxId, email);
  return purchase;
}

const vendorService = {
  createVendor,
};

export default vendorService;
// export * from './errors';

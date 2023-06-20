import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let cc = await prisma.costCenter.findFirst();
  const costCenters = [
    { code: '1000', name: 'TI' },
    { code: '2000', name: 'Marketing' },
    { code: '3000', name: 'Finance' },
    { code: '4000', name: 'R&D' },
  ];
  if (!cc) {
    await prisma.costCenter.createMany({
      data: costCenters,
    });
  }
  let kc = await prisma.keyCountry.findFirst();
  const keyCountries = [
    { code: 'BRA', name: 'Brazil' },
    { code: 'WRL', name: 'Global' },
    { code: 'LTM', name: 'Latam' },
    { code: 'EUR', name: 'Europe' },
  ];
  if (!kc) {
    await prisma.keyCountry.createMany({
      data: keyCountries,
    });
  }
  let typeItem = await prisma.typeItem.findFirst();
  const typeItems = [
    { code: 'P00001', name: 'Rent' },
    { code: 'P00002', name: 'Hosting' },
    { code: 'P00003', name: 'Service provider' },
    { code: 'P00004', name: 'Advertising' },
  ];
  if (!typeItem) {
    await prisma.typeItem.createMany({
      data: typeItems,
    });
  }
  let city = await prisma.city.findFirst();
  const cities = [
    { code: 1, name: 'Rio de Janeiro' },
    { code: 2, name: 'São Paulo' },
  ];
  if (!city) {
    await prisma.city.createMany({
      data: cities,
    });
  }
  let state = await prisma.state.findFirst();
  const states = [
    { code: 'RJ', name: 'Rio de Janeiro' },
    { code: 'SP', name: 'São Paulo' },
  ];
  if (!state) {
    await prisma.state.createMany({
      data: states,
    });
  }
  let country = await prisma.country.findFirst();
  const countries = [{ code: 'BR', name: 'Brazil' }];
  if (!country) {
    await prisma.country.createMany({
      data: countries,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import itemRepository from '@/repositories/item-repository';
import optionsRepository from '@/repositories/acessories-repository';
import vendorRepository from '@/repositories/vendor-repository';
import userRepository from '@/repositories/user-repository';

async function readAccessories() {
  const vendors = await vendorRepository.readVendor();
  const users = await userRepository.readUser();
  const typeItems = await itemRepository.readTypeItem();
  const costCenters = await optionsRepository.readCostCenter();
  const keyCountries = await optionsRepository.readKeyCountry();
  const options = await optionsRepository.readListOptions();
  const response = { vendors, users, typeItems, costCenters, keyCountries, options };
  return response;
}

const accessoryService = {
  readAccessories,
};

export default accessoryService;

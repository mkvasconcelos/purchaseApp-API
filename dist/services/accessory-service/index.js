"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_repository_1 = __importDefault(require("../../repositories/item-repository/index"));
const acessories_repository_1 = __importDefault(require("../../repositories/acessories-repository/index"));
const vendor_repository_1 = __importDefault(require("../../repositories/vendor-repository/index"));
const user_repository_1 = __importDefault(require("../../repositories/user-repository/index"));
async function readAccessories() {
    const vendors = await vendor_repository_1.default.readVendor();
    const users = await user_repository_1.default.readUser();
    const typeItems = await item_repository_1.default.readTypeItem();
    const costCenters = await acessories_repository_1.default.readCostCenter();
    const keyCountries = await acessories_repository_1.default.readKeyCountry();
    const options = await acessories_repository_1.default.readListOptions();
    const response = { vendors, users, typeItems, costCenters, keyCountries, options };
    return response;
}
const accessoryService = {
    readAccessories,
};
exports.default = accessoryService;

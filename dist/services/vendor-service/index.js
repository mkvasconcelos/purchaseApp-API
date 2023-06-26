"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vendor_repository_1 = __importDefault(require("../../repositories/vendor-repository/index"));
async function createVendor(codeSap, name, fiscalTaxId, email) {
    const purchase = await vendor_repository_1.default.createVendor(codeSap, name, fiscalTaxId, email);
    return purchase;
}
const vendorService = {
    createVendor,
};
exports.default = vendorService;
// export * from './errors';

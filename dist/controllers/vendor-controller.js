"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVendor = void 0;
const http_status_1 = __importDefault(require("http-status"));
const vendor_service_1 = __importDefault(require("../services/vendor-service/index"));
async function createVendor(req, res) {
    const { codeSap, name, fiscalTaxId, email } = req.body;
    try {
        const result = await vendor_service_1.default.createVendor(codeSap, name, fiscalTaxId, email);
        return res.sendStatus(http_status_1.default.CREATED);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.createVendor = createVendor;

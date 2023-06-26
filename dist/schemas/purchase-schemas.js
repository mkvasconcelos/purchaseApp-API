"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.purchaseSchema = joi_1.default.object({
    type: joi_1.default.string().valid('New', 'Renewal', 'Adjustment', 'Termination').required(),
    delivery: joi_1.default.string().valid('Recurrent', 'Spot').required(),
    startContract: joi_1.default.string().isoDate().required(),
    endContract: joi_1.default.string().isoDate().required(),
    vendorId: joi_1.default.number().integer().positive().required(),
    observation: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    approverId: joi_1.default.number().integer().positive().required(),
    listItems: joi_1.default.array()
        .items(joi_1.default.object({
        typeId: joi_1.default.string().required(),
        ccId: joi_1.default.string().required(),
        kcId: joi_1.default.string().required(),
        quantity: joi_1.default.number().integer().positive().required(),
        priceUnit: joi_1.default.number().integer().positive().required(),
    }))
        .min(1)
        .required(),
});

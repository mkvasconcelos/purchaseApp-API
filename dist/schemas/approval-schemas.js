"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvalStatusSchema = exports.approvalSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.approvalSchema = joi_1.default.object({
    purchaseId: joi_1.default.number().integer().positive().required(),
});
exports.approvalStatusSchema = joi_1.default.object({
    status: joi_1.default.boolean().required(),
});

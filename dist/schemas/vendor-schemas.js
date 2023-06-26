"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.vendorSchema = joi_1.default.object({
    codeSap: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    fiscalTaxId: joi_1.default.string().length(14).required(),
    email: joi_1.default.string().email().required(),
});

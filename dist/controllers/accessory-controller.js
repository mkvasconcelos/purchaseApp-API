"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAccessory = void 0;
const http_status_1 = __importDefault(require("http-status"));
const accessory_service_1 = __importDefault(require("../services/accessory-service/index"));
async function readAccessory(req, res) {
    try {
        const result = await accessory_service_1.default.readAccessories();
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.readAccessory = readAccessory;

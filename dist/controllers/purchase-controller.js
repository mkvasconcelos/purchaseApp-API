"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPurchaseById = exports.readPurchase = exports.createPurchase = void 0;
const http_status_1 = __importDefault(require("http-status"));
const purchase_service_1 = __importDefault(require("../services/purchase-service/index"));
async function createPurchase(req, res) {
    const { userId } = req;
    const { type, delivery, description, startContract, endContract, vendorId, observation, listItems, approverId } = req.body;
    let parts = startContract.split('-');
    const newStartContract = new Date(parts[0], parts[1] - 1, parts[2]);
    parts = endContract.split('-');
    const newEndContract = new Date(parts[0], parts[1] - 1, parts[2]);
    try {
        let totalContract = 0;
        for (let i = 0; i < listItems.length; i++) {
            const { quantity, priceUnit } = listItems[i];
            totalContract += quantity * priceUnit;
        }
        const result = await purchase_service_1.default.createPurchase(userId, type, delivery, totalContract, newStartContract, newEndContract, vendorId, observation, approverId, description);
        const purchaseId = result.id;
        for (let i = 0; i < listItems.length; i++) {
            const { typeId, ccId, kcId, quantity, priceUnit } = listItems[i];
            await purchase_service_1.default.createItem(typeId, ccId, kcId, purchaseId, quantity, priceUnit);
        }
        return res.sendStatus(http_status_1.default.CREATED);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.createPurchase = createPurchase;
async function readPurchase(req, res) {
    const { userId } = req;
    try {
        const result = await purchase_service_1.default.readPurchase(userId);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.readPurchase = readPurchase;
async function readPurchaseById(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const newId = parseInt(id);
    try {
        const result = await purchase_service_1.default.readPurchaseById(userId, newId);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        else {
            return res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }
}
exports.readPurchaseById = readPurchaseById;

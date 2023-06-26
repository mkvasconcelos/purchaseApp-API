"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchase_repository_1 = __importDefault(require("../../repositories/purchase-repository/index"));
const item_repository_1 = __importDefault(require("../../repositories/item-repository/index"));
const user_repository_1 = __importDefault(require("../../repositories/user-repository/index"));
const vendor_repository_1 = __importDefault(require("../../repositories/vendor-repository/index"));
const acessories_repository_1 = __importDefault(require("../../repositories/acessories-repository/index"));
const approval_repository_1 = __importDefault(require("../../repositories/approval-repository/index"));
const errors_1 = require("../../errors/index");
async function createPurchase(requesterId, type, delivery, totalContract, startContract, endContract, vendorId, observation, approverId, description) {
    const purchase = await purchase_repository_1.default.createPurchase(requesterId, type, delivery, totalContract, startContract, endContract, vendorId, observation, 'Sent', description);
    await approval_repository_1.default.createApproval(approverId, purchase.id);
    return purchase;
}
async function createItem(typeId, ccId, kcId, purchaseId, quantity, priceUnit) {
    const item = await item_repository_1.default.createItem(typeId, ccId, kcId, purchaseId, quantity, priceUnit);
    return item;
}
async function readPurchase(requesterId) {
    const purchase = await purchase_repository_1.default.readPurchase(requesterId);
    const response = [];
    for (let i = 0; i < purchase.length; i++) {
        const requester = await user_repository_1.default.findById(purchase[i].requesterId);
        const vendor = await vendor_repository_1.default.findById(purchase[i].vendorId);
        let formattedDate = `${(purchase[i].createdAt.getMonth() + 1).toString().padStart(2, '0')}/${purchase[i].createdAt.getDate()}/${purchase[i].createdAt.getFullYear()}`;
        let formattedTime = `${purchase[i].createdAt.getHours()}:${purchase[i].createdAt.getMinutes()}`;
        const createdAt = `${formattedDate} ${formattedTime}`;
        formattedDate = `${(purchase[i].updatedAt.getMonth() + 1).toString().padStart(2, '0')}/${purchase[i].updatedAt.getDate()}/${purchase[i].updatedAt.getFullYear()}`;
        formattedTime = `${purchase[i].updatedAt.getHours()}:${purchase[i].updatedAt.getMinutes()}`;
        const updatedAt = `${formattedDate} ${formattedTime}`;
        response.push({
            id: purchase[i].id,
            requester: requester.name,
            vendor: vendor.name,
            status: purchase[i].status,
            createdAt,
            updatedAt,
        });
    }
    return response;
}
async function readPurchaseById(requesterId, id) {
    const approval = await approval_repository_1.default.getApprovalById(requesterId, id);
    const purchase = await purchase_repository_1.default.readPurchaseById(id);
    if (!approval) {
        if (purchase.requesterId !== requesterId) {
            throw errors_1.notFoundError();
        }
    }
    else if (!purchase) {
        throw errors_1.invalidDataError([]);
    }
    const item = await item_repository_1.default.readItem(purchase.id);
    const requester = await user_repository_1.default.findById(purchase.requesterId);
    const vendor = await vendor_repository_1.default.findById(purchase.vendorId);
    let formattedDate = `${(purchase.createdAt.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${purchase.createdAt.getDate()}/${purchase.createdAt.getFullYear()}`;
    let formattedTime = `${purchase.createdAt.getHours()}:${purchase.createdAt.getMinutes()}`;
    const createdAt = `${formattedDate} ${formattedTime}`;
    formattedDate = `${(purchase.updatedAt.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${purchase.updatedAt.getDate()}/${purchase.updatedAt.getFullYear()}`;
    formattedTime = `${purchase.updatedAt.getHours()}:${purchase.updatedAt.getMinutes()}`;
    const updatedAt = `${formattedDate} ${formattedTime}`;
    formattedDate = `${(purchase.startContract.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${purchase.startContract.getDate()}/${purchase.startContract.getFullYear()}`;
    const startContract = `${formattedDate}`;
    formattedDate = `${(purchase.endContract.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${purchase.endContract.getDate()}/${purchase.endContract.getFullYear()}`;
    const endContract = `${formattedDate}`;
    const newItem = [];
    for (let i = 0; i < item.length; i++) {
        const cc = await acessories_repository_1.default.findCostCenter(item[i].ccId);
        const kc = await acessories_repository_1.default.findKeyCountry(item[i].kcId);
        const typeItem = await item_repository_1.default.findTypeItem(item[i].typeId);
        newItem.push({
            ...item[i],
            priceUnit: (item[i].priceUnit / 100).toLocaleString('en-US'),
            ccId: cc.name,
            kcId: kc.name,
            typeId: typeItem.name,
        });
    }
    const response = {
        id: purchase.id,
        requester: requester.name,
        type: purchase.type,
        delivery: purchase.delivery,
        totalContract: (purchase.totalContract / 100).toLocaleString('en-US'),
        startContract,
        endContract,
        vendor: vendor.name,
        observation: purchase.observation,
        status: purchase.status,
        createdAt,
        updatedAt,
        listItems: newItem,
    };
    return response;
}
const purchaseService = {
    createPurchase,
    readPurchase,
    readPurchaseById,
    createItem,
};
exports.default = purchaseService;

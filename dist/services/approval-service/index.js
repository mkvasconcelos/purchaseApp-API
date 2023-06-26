"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors/index");
const approval_repository_1 = __importDefault(require("../../repositories/approval-repository/index"));
const purchase_repository_1 = __importDefault(require("../../repositories/purchase-repository/index"));
const user_repository_1 = __importDefault(require("../../repositories/user-repository/index"));
const vendor_repository_1 = __importDefault(require("../../repositories/vendor-repository/index"));
async function getApprovals(requesterId) {
    const approvals = await approval_repository_1.default.getApprovals(requesterId);
    const response = [];
    for (let i = 0; i < approvals.length; i++) {
        const purchase = await purchase_repository_1.default.readPurchaseByApprover(approvals[i].purchaseId);
        const vendor = await vendor_repository_1.default.findById(purchase.vendorId);
        const user = await user_repository_1.default.findById(purchase.requesterId);
        response.push({
            purchaseId: approvals[i].purchaseId,
            vendor: vendor.name,
            description: purchase.description,
            totalContract: purchase.totalContract / 100,
            user: user.name,
        });
    }
    return response;
}
async function getApprovalById(requesterId, purchaseId) {
    const purchase = await purchase_repository_1.default.readPurchaseById(purchaseId);
    if (!purchase) {
        throw errors_1.notFoundError();
    }
    if (purchase.requesterId === requesterId) {
        throw errors_1.notFoundError();
    }
    const response = await approval_repository_1.default.getApprovalById(requesterId, purchase.id);
    if (!response) {
        throw errors_1.notFoundError();
    }
    return;
}
async function updateApprovals(requesterId, purchaseId, status) {
    await approval_repository_1.default.updateApproval(requesterId, purchaseId);
    await purchase_repository_1.default.updatePurchase(purchaseId, status);
    return;
}
const approvalService = {
    getApprovals,
    getApprovalById,
    updateApprovals,
};
exports.default = approvalService;

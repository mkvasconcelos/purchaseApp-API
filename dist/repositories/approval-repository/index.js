"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function getApprovals(requesterId) {
    return config_1.prisma.approval.findMany({
        where: {
            approverId: requesterId,
            status: false,
        },
        select: {
            purchaseId: true,
        },
    });
}
async function createApproval(approverId, purchaseId) {
    return config_1.prisma.approval.create({
        data: {
            approverId,
            status: false,
            purchaseId,
        },
    });
}
async function getApprovalById(approverId, purchaseId) {
    return config_1.prisma.approval.findFirst({
        where: {
            approverId,
            purchaseId,
        },
    });
}
async function updateApproval(approverId, purchaseId) {
    return config_1.prisma.approval.update({
        where: {
            approverId_purchaseId: { approverId, purchaseId },
        },
        data: {
            status: true,
        },
    });
}
const approvalRepository = {
    getApprovals,
    createApproval,
    getApprovalById,
    updateApproval,
};
exports.default = approvalRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
const client_1 = require("@prisma/client");
async function createPurchase(requesterId, type, delivery, totalContract, startContract, endContract, vendorId, observation, status, description) {
    return config_1.prisma.purchaseRequest.create({
        data: {
            requesterId,
            type,
            delivery,
            totalContract,
            startContract,
            endContract,
            vendorId,
            observation,
            status,
            description,
        },
    });
}
async function readPurchase(requesterId) {
    return config_1.prisma.purchaseRequest.findMany({
        where: {
            requesterId,
        },
    });
}
// async function readPurchaseById(requesterId: number, id: number): Promise<PurchaseRequest> {
//   return prisma.purchaseRequest.findFirst({
//     where: {
//       id,
//       requesterId,
//     },
//   });
// }
async function readPurchaseById(id) {
    return config_1.prisma.purchaseRequest.findFirst({
        where: {
            id,
        },
    });
}
async function readPurchaseByApprover(id) {
    return config_1.prisma.purchaseRequest.findFirst({
        where: {
            id,
        },
        select: { description: true, totalContract: true, requesterId: true, vendorId: true },
    });
}
async function updatePurchase(id, status) {
    let newStatus;
    if (status) {
        newStatus = client_1.PurchaseStatus.Approved;
    }
    else {
        newStatus = client_1.PurchaseStatus.Rejected;
    }
    return config_1.prisma.purchaseRequest.update({
        where: {
            id,
        },
        data: { status: newStatus },
    });
}
const purchaseRepository = {
    createPurchase,
    readPurchase,
    readPurchaseById,
    readPurchaseByApprover,
    updatePurchase,
};
exports.default = purchaseRepository;

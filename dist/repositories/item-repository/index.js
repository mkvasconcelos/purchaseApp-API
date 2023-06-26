"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function createItem(typeId, ccId, kcId, purchaseId, quantity, priceUnit) {
    return config_1.prisma.item.create({
        data: {
            typeId,
            ccId,
            kcId,
            purchaseId,
            quantity,
            priceUnit,
        },
    });
}
async function readItem(purchaseId) {
    return config_1.prisma.item.findMany({
        where: {
            purchaseId,
        },
    });
}
async function readTypeItem() {
    return config_1.prisma.typeItem.findMany({
        select: {
            code: true,
            name: true,
        },
    });
}
async function findTypeItem(code) {
    return config_1.prisma.typeItem.findFirst({
        where: {
            code,
        },
        select: {
            name: true,
        },
    });
}
const itemRepository = {
    createItem,
    readItem,
    readTypeItem,
    findTypeItem,
};
exports.default = itemRepository;

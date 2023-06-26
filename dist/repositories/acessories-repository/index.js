"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
const client_1 = require("@prisma/client");
async function readListOptions() {
    const options = { type: client_1.RequestType, delivery: client_1.Condition, status: client_1.PurchaseStatus };
    return options;
}
async function readCostCenter() {
    return config_1.prisma.costCenter.findMany({
        select: {
            code: true,
            name: true,
        },
    });
}
async function findCostCenter(code) {
    return config_1.prisma.costCenter.findFirst({
        where: {
            code,
        },
        select: {
            name: true,
        },
    });
}
async function readKeyCountry() {
    return config_1.prisma.keyCountry.findMany({
        select: {
            code: true,
            name: true,
        },
    });
}
async function findKeyCountry(code) {
    return config_1.prisma.keyCountry.findFirst({
        where: {
            code,
        },
        select: {
            name: true,
        },
    });
}
const accessoriesRepository = {
    readListOptions,
    readCostCenter,
    readKeyCountry,
    findCostCenter,
    findKeyCountry,
};
exports.default = accessoriesRepository;

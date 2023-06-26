"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function createVendor(codeSap, name, fiscalTaxId, email) {
    return config_1.prisma.vendor.create({
        data: {
            codeSap,
            name,
            fiscalTaxId,
            email,
        },
    });
}
async function findById(id) {
    return config_1.prisma.vendor.findFirst({
        where: {
            id,
        },
        select: {
            name: true,
        },
    });
}
async function readVendor() {
    return config_1.prisma.vendor.findMany({
        select: {
            fiscalTaxId: true,
            name: true,
            id: true,
        },
    });
}
const vendorRepository = {
    createVendor,
    findById,
    readVendor,
};
exports.default = vendorRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/index");
async function createUser(name, email, password) {
    return config_1.prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });
}
async function findByEmail(email) {
    return config_1.prisma.user.findFirst({
        where: {
            email,
        },
    });
}
async function findById(id) {
    return config_1.prisma.user.findFirst({
        where: {
            id,
        },
        select: {
            name: true,
        },
    });
}
async function readUser() {
    return config_1.prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
}
const userRepository = {
    createUser,
    findByEmail,
    findById,
    readUser,
};
exports.default = userRepository;

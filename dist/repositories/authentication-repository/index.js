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
const authenticationRepository = {
    createUser,
};
exports.default = authenticationRepository;

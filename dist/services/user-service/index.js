"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../../repositories/user-repository/index"));
async function findNameUser(userId) {
    const name = await user_repository_1.default.findById(userId);
    return name;
}
const userService = {
    findNameUser,
};
exports.default = userService;

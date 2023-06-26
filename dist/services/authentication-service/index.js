"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../../repositories/user-repository/index"));
const errors_1 = require("../../errors/index");
async function signUp(name, email, password) {
    const user = await user_repository_1.default.findByEmail(email);
    if (user)
        throw errors_1.conflictError('Email already in use.');
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    return await user_repository_1.default.createUser(name, email, hashedPassword);
}
async function signIn(email, password) {
    const user = await user_repository_1.default.findByEmail(email);
    const userPassword = user.password;
    const isPasswordValid = await bcrypt_1.default.compare(password, userPassword);
    if (!isPasswordValid)
        throw errors_1.invalidCredentialsError();
    const userId = user.id;
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET);
    return token;
}
const authenticationService = {
    signUp,
    signIn,
};
exports.default = authenticationService;

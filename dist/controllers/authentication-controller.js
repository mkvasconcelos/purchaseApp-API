"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const http_status_1 = __importDefault(require("http-status"));
const authentication_service_1 = __importDefault(require("../services/authentication-service/index"));
async function signUp(req, res) {
    const { name, email, password } = req.body;
    try {
        await authentication_service_1.default.signUp(name, email, password);
        return res.sendStatus(http_status_1.default.CREATED);
    }
    catch (error) {
        return res.status(http_status_1.default.CONFLICT).send(error);
    }
}
exports.signUp = signUp;
async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const token = await authentication_service_1.default.signIn(email, password);
        return res.status(http_status_1.default.OK).send({ token });
    }
    catch {
        return res.status(http_status_1.default.UNAUTHORIZED).send('Invalid email/password.');
    }
}
exports.signIn = signIn;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = __importDefault(require("../services/user-service/index"));
async function getNameUser(req, res) {
    const { userId } = req;
    try {
        const result = await user_service_1.default.findNameUser(userId);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.getNameUser = getNameUser;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApproval = exports.getApprovalById = exports.getApprovals = void 0;
const http_status_1 = __importDefault(require("http-status"));
const approval_service_1 = __importDefault(require("../services/approval-service/index"));
async function getApprovals(req, res) {
    const { userId } = req;
    try {
        const result = await approval_service_1.default.getApprovals(userId);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.getApprovals = getApprovals;
async function getApprovalById(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const newId = parseInt(id);
    try {
        await approval_service_1.default.getApprovalById(userId, newId);
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        else {
            return res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }
}
exports.getApprovalById = getApprovalById;
async function updateApproval(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const { status } = req.body;
    const newId = parseInt(id);
    try {
        await approval_service_1.default.updateApprovals(userId, newId, status);
        return res.sendStatus(http_status_1.default.NO_CONTENT);
    }
    catch (error) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
}
exports.updateApproval = updateApproval;

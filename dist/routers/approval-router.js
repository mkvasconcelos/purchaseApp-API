"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvalRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares/index");
const controllers_1 = require("../controllers/index");
const schemas_1 = require("../schemas/index");
const approvalRouter = express_1.Router();
exports.approvalRouter = approvalRouter;
approvalRouter
    .all('/*', middlewares_1.authenticateToken)
    .get('/', controllers_1.getApprovals)
    .get('/:id', controllers_1.getApprovalById)
    .put('/:id', middlewares_1.validateBody(schemas_1.approvalStatusSchema), controllers_1.updateApproval);

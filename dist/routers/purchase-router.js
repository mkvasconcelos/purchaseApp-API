"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseRouter = void 0;
const express_1 = require("express");
const schemas_1 = require("../schemas/index");
const middlewares_1 = require("../middlewares/index");
const controllers_1 = require("../controllers/index");
const purchaseRouter = express_1.Router();
exports.purchaseRouter = purchaseRouter;
purchaseRouter
    .all('/*', middlewares_1.authenticateToken)
    .post('/', middlewares_1.validateBody(schemas_1.purchaseSchema), controllers_1.createPurchase)
    .get('/', controllers_1.readPurchase)
    .get('/:id', controllers_1.readPurchaseById);

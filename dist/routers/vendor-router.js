"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRouter = void 0;
const express_1 = require("express");
const schemas_1 = require("../schemas/index");
const middlewares_1 = require("../middlewares/index");
const controllers_1 = require("../controllers/index");
const vendorRouter = express_1.Router();
exports.vendorRouter = vendorRouter;
vendorRouter.all('/*', middlewares_1.authenticateToken).post('/', middlewares_1.validateBody(schemas_1.vendorSchema), controllers_1.createVendor);
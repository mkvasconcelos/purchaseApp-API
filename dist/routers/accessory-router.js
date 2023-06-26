"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessoryRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares/index");
const controllers_1 = require("../controllers/index");
const accessoryRouter = express_1.Router();
exports.accessoryRouter = accessoryRouter;
accessoryRouter.all('/*', middlewares_1.authenticateToken).get('/', controllers_1.readAccessory);

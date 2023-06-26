"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares/index");
const controllers_1 = require("../controllers/index");
const userRouter = express_1.Router();
exports.userRouter = userRouter;
userRouter.all('/*', middlewares_1.authenticateToken).get('/', controllers_1.getNameUser);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const auth_1 = __importDefault(require("../middleware/auth"));
const userRouter = (0, express_1.Router)();
userRouter.get('/users', user_1.default.getUser);
userRouter.get('/users/:id', auth_1.default, user_1.default.getUserById);
userRouter.post('/users', auth_1.default, user_1.default.createUser);
userRouter.post("/login", auth_1.default, user_1.default.authenticate);
userRouter.delete('/users/:id', auth_1.default, user_1.default.destroyedUser);
exports.default = userRouter;

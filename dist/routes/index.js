"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const products_1 = __importDefault(require("./products"));
const orders_1 = __importDefault(require("./orders"));
const routes = (0, express_1.Router)();
routes.use("./users", users_1.default);
routes.use('/products', products_1.default);
routes.use('./orders', orders_1.default);
exports.default = routes;

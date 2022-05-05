"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = __importDefault(require("../controllers/orders"));
const auth_1 = __importDefault(require("../middleware/auth"));
const orderRouter = (0, express_1.Router)();
orderRouter.get('/orders', orders_1.default.getAllOrders);
orderRouter.get('/orders/:id', orders_1.default.getOrderById);
orderRouter.post('/orders', auth_1.default, orders_1.default.createOrder);
orderRouter.get('/users/:id/active-orders', auth_1.default, orders_1.default.activeOrders);
orderRouter.get('/users/:id/orders', auth_1.default, orders_1.default.showUserOrders);
orderRouter.get('/users/:id/completed-orders', auth_1.default, orders_1.default.completedOrders);
orderRouter.post('orders/:id/product/:id', auth_1.default, orders_1.default.addProduct);
orderRouter.delete('/orders/:id', auth_1.default, orders_1.default.destroyOrder);
exports.default = orderRouter;

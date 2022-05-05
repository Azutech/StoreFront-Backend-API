"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("../controllers/products"));
const auth_1 = __importDefault(require("../middleware/auth"));
const productRouter = (0, express_1.Router)();
productRouter.get('/coffees', products_1.default.getProductsall);
productRouter.get('/coffees/:id', auth_1.default, products_1.default.getProductById);
productRouter.post('/coffees', auth_1.default, products_1.default.createProduct);
productRouter.patch('/coffees/:id', products_1.default.updateProduct);
productRouter.delete('/coffees/:id', auth_1.default, products_1.default.destroyProduct);
exports.default = productRouter;

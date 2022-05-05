"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../model/orders");
const store = new orders_1.OrdersLog();
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.getAllOrders();
        res.status(200).json({
            status: 'Success',
            message: 'All Orders has been found',
            data: orders,
        });
    }
    catch (error) {
        res.status(404);
        res.json({ message: 'No Order was found' });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.getOrderById(req.params.id);
        res.status(200).json({
            status: 'Success',
            message: 'This Order has been found',
            data: order,
        });
    }
    catch (error) {
        res.status(404);
        res.json({ message: 'This order was not found' });
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            status: req.body.status,
            userId: req.body.user_id,
        };
        console.log(order);
        const orders = yield store.createOrder(order);
        res.status(200).json({
            status: 'Success',
            message: 'This Order has been found',
            data: orders,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404);
        res.json({ message: 'Cant create order' });
    }
});
const destroyOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteOrder = yield store.destroy(req.params.id);
        res.status(200).json({
            status: 'Success',
            message: 'This Order has been deleted',
            data: deleteOrder,
        });
    }
    catch (error) {
        res.status(404);
        res.json({ message: 'Cant delete order' });
    }
});
const showUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.showUserOrders(req.params.id);
        res.status(200).json({
            status: 'Success',
            message: 'This Order shows',
            data: orders,
        });
    }
    catch (error) {
        res.status(404);
        res.json({ message: 'Cant show order' });
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.body.id;
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity, 10);
    try {
        const addProduct = yield store.addProduct(quantity, orderId, productId);
        res.status(200).json({
            status: 'Success',
            message: 'This Order has been added',
            data: addProduct,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404);
        res.json({ message: 'Cant add order' });
    }
});
const completedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completeOrder = yield store.completedOrders(req.params.id);
        res.status(200).json({
            status: 'Success',
            message: 'This Order has been completed',
            data: completeOrder,
        });
    }
    catch (err) {
        res.status(404);
        res.json({ message: 'Order has not been completed' });
    }
});
const activeOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentOrder = yield store.activeOrders(req.params.id);
        res.status(200).json({
            status: 'Success',
            message: 'This Order has been completed',
            data: currentOrder,
        });
    }
    catch (err) {
        res.status(404);
        res.json({ message: 'Can not find this order' });
    }
});
exports.default = { getOrderById, createOrder, destroyOrder, getAllOrders, showUserOrders, completedOrders, activeOrders, addProduct };

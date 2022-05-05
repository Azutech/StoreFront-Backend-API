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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersLog = void 0;
const database_1 = __importDefault(require("../utils/database"));
class OrdersLog {
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(typeof order.userId);
                const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
                const conn = yield database_1.default.connect();
                const values = [order.status, order.userId];
                const result = yield conn.query(sql, values);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not create order ${error}`);
            }
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`unable to fetch orders from database ${error}`);
            }
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders WHERE id=${id}`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (error) {
                throw new Error(`could not find order with id ${id}. ${error}`);
            }
        });
    }
    showUserOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders WHERE user_id=${userId};`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Something went wrong unable to get orders ID:${userId}.${error}`);
            }
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM orders WHERE id=${id}`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (error) {
                throw new Error(`Something went wrong unable to delete order with id = ${id}`);
            }
        });
    }
    addProduct(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1,$2,$3) RETURNING *`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [quantity, orderId, productId]);
                const addProduct = result.rows[0];
                conn.release();
                return addProduct;
            }
            catch (error) {
                throw new Error(`unable to add product with id ${productId} ${error}`);
            }
        });
    }
    activeOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders WHERE user_id=${id} AND status='active'`;
                const conn = yield database_1.default.connect();
                const results = yield conn.query(sql);
                conn.release();
                return results.rows;
            }
            catch (error) {
                throw new Error(`Something went wrong! No current orders for user id = ${id}`);
            }
        });
    }
    completedOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders WHERE user_id=${id} AND status='complete'`;
                const conn = yield database_1.default.connect();
                const results = yield conn.query(sql);
                conn.release();
                return results.rows;
            }
            catch (error) {
                throw new Error(`Something went wrong! No complete orders for user id = ${id}`);
            }
        });
    }
}
exports.OrdersLog = OrdersLog;

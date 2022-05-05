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
exports.CoffeeStore = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const database_1 = __importDefault(require("../utils/database"));
class CoffeeStore {
    getProductsall() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                conn.release();
                console.log('kkk', result);
                const products = result.rows;
                return products;
            }
            catch (error) {
                throw new Error(`could not find products. Not Found: ${error}`);
            }
        });
    }
    getProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id = ($1)';
                const res = yield conn.query(sql, [id]);
                conn.release();
                return res.rows[0];
            }
            catch (error) {
                throw new Error(`could not find products ${id}. Not Found: ${error}`);
            }
        });
    }
    // async createProduct(prod: product): Promise<Product[]> {
    //   try {
    //     const sql =
    //       'INSERT INTO products (name, price, type, origin) VALUES ($1, $2, $3, $4) RETURNING *';
    //        //@ts-ignore
    //     const conn = await client.connect();
    //     const values= [prod.name, prod.price, prod.type, prod.origin]
    //     const result = await conn.query(sql, values);
    //     // const products = result.rows[0];
    //     console.log('kkk', result);
    //     conn.release();
    //     return result.rows;
    //   } catch (error) {
    //     throw new Error(`can't this coffee with id ${prod.name}, ${error}`);
    //   }
    // }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO products (name, price, type, origin) VALUES ($1, $2, $3, $4) RETURNING *;";
                const values = [product.name, product.price, product.type, product.origin];
                const res = yield conn.query(sql, values);
                const result = res.rows;
                conn.release();
                return result;
            }
            catch (error) {
                throw new Error(`could not connect fetch data from the db ${error}`);
            }
        });
    }
    destroyProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM products WHERE id=($1)';
                const res = yield conn.query(sql, [id]);
                conn.release();
                return res.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete these products ${id}. REVERT: ${error}`);
            }
        });
    }
    updateProduct(prod, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = `UPDATE products SET name = ($1), price = ($2), type = ($3), origin = ($4) WHERE id = '${id}' RETURNING *`;
                const values = [
                    prod.name,
                    prod.price,
                    prod.type,
                    prod.origin,
                ];
                const result = yield conn.query(sql, values);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (error) {
                throw new Error(`could not find add new products ${prod.name}. Not Found: ${error}`);
            }
        });
    }
}
exports.CoffeeStore = CoffeeStore;

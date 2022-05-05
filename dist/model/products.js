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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CoffeeStore = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
var database_1 = __importDefault(require("../utils/database"));
var CoffeeStore = /** @class */ (function () {
    function CoffeeStore() {
    }
    CoffeeStore.prototype.getProductsall = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, products, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM products';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        console.log('kkk', result);
                        products = result.rows;
                        return [2 /*return*/, products];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("could not find products. Not Found: ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoffeeStore.prototype.getProductsById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM products WHERE id = ($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("could not find products ".concat(id, ". Not Found: ").concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
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
    CoffeeStore.prototype.create = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, values, res, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO products (name, price, type, origin) VALUES ($1, $2, $3, $4) RETURNING *;";
                        values = [product.name, product.price, product.type, product.origin];
                        return [4 /*yield*/, conn.query(sql, values)];
                    case 2:
                        res = _a.sent();
                        result = res.rows;
                        conn.release();
                        return [2 /*return*/, result];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("could not connect fetch data from the db ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoffeeStore.prototype.destroyProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM products WHERE id=($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Could not delete these products ".concat(id, ". REVERT: ").concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoffeeStore.prototype.updateProduct = function (prod, id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, values, result, product, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "UPDATE products SET name = ($1), price = ($2), type = ($3), origin = ($4) WHERE id = '".concat(id, "' RETURNING *");
                        values = [
                            prod.name,
                            prod.price,
                            prod.type,
                            prod.origin,
                        ];
                        return [4 /*yield*/, conn.query(sql, values)];
                    case 2:
                        result = _a.sent();
                        product = result.rows[0];
                        conn.release();
                        return [2 /*return*/, product];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("could not find add new products ".concat(prod.name, ". Not Found: ").concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CoffeeStore;
}());
exports.CoffeeStore = CoffeeStore;
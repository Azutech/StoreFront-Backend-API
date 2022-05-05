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
var products_1 = require("../model/products");
var auth_1 = __importDefault(require("../middleware/auth"));
var store = new products_1.CoffeeStore();
// export default class ProductController {
// }
var getProductsall = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.getProductsall()
                    // if (products.length <1) responeUtil(res, 200, null, "No products found", "Success" )
                ];
            case 1:
                products = _a.sent();
                // if (products.length <1) responeUtil(res, 200, null, "No products found", "Success" )
                res.status(200).json({
                    status: 'Success',
                    message: "All products were found successfully",
                    data: products
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500);
                res.json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//  const responeUtil = (res:Response, statusCode:number, data:any, message:string, statusMessage:string)=>{
//   return  res.status(statusCode).json({
//         status:statusMessage,
//         message:message,
//         data: data
//     })
//  }
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var coffee, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('abeg work');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                coffee = {
                    name: req.body.name,
                    price: req.body.price,
                    type: req.body.type,
                    origin: req.body.origin
                };
                console.log(coffee);
                return [4 /*yield*/, store.create(coffee)];
            case 2:
                product = _a.sent();
                res.json(product);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(404);
                res.json({ message: "can't create product" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var coffee, product, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.body.name) {
                    return [2 /*return*/, res.status(400).json({
                            error: 'Fill in the right Product'
                        })];
                }
                coffee = {
                    name: req.body.name,
                    price: req.body.price,
                    type: req.body.type,
                    origin: req.body.origin
                };
                return [4 /*yield*/, store.updateProduct(coffee, req.params.id)];
            case 1:
                product = _a.sent();
                res.json(product);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(404);
                res.json(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.getProductsById(parseInt(req.params.id))];
            case 1:
                product = _a.sent();
                res.status(200).json(product);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500);
                res.json(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroyProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.destroyProduct(parseInt(req.params.id))];
            case 1:
                _a.sent();
                res.status(200).json({ status: "Deleted product ".concat(req.params.id) });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(500).json(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var product_stores = function (app) {
    app.get('/coffees', getProductsall);
    app.get('/coffees/:id', auth_1["default"], getProductById);
    app.post('/coffees', auth_1["default"], createProduct);
    app.patch('/coffees/:id', updateProduct);
    app["delete"]('/coffees/:id', auth_1["default"], destroyProduct);
};
exports["default"] = product_stores;

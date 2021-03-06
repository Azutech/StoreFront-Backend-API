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
const products_1 = require("../model/products");
const store = new products_1.CoffeeStore();
const getProductsall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.getProductsall();
        // if (products.length <1) responeUtil(res, 200, null, "No products found", "Success" )
        res.status(200).json({
            status: 'Success',
            message: "All products were found successfully",
            data: products
        });
    }
    catch (error) {
        res.status(500);
        res.json(error);
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('abeg work');
    try {
        const coffee = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
            origin: req.body.origin
        };
        console.log(coffee);
        const product = yield store.create(coffee);
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.status(404);
        res.json({ message: `can't create product` });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                error: 'Fill in the right Product'
            });
        }
        const coffee = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
            origin: req.body.origin
        };
        const product = yield store.updateProduct(coffee, req.params.id);
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.status(404);
        res.json(error);
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.getProductsById(parseInt(req.params.id));
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500);
        res.json(error);
    }
});
const destroyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield store.destroyProduct(parseInt(req.params.id));
        res.status(200).json({ status: `Deleted product ${req.params.id}` });
    }
    catch (e) {
        res.status(500).json(e);
    }
});
exports.default = { getProductsall, getProductById, createProduct, updateProduct, destroyProduct };
// const product_stores = (app: express.Application) => {
// app.get('/coffees',  getProductsall)
// app.get('/coffees/:id', verifyToken, getProductById)
// app.post('/coffees', verifyToken, createProduct)
// app.patch('/coffees/:id', updateProduct)
// app.delete('/coffees/:id', verifyToken, destroyProduct)
// }
// export default product_stores

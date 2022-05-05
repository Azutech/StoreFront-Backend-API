"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let secret;
if (process.env.TOKEN_SECRET) {
    secret = process.env.TOKEN_SECRET;
}
const verifyToken = (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized!!' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log(decoded);
        next();
    }
    catch (error) {
        console.log(error);
        res
            .status(404)
            .json({ Message: 'You are not authorized for this service' });
    }
};
exports.default = verifyToken;

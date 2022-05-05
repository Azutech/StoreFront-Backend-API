"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTokken = exports.createJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jsonwebtoken_2 = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;
const createJWTToken = (id, username) => {
    return jsonwebtoken_1.default.sign({ id, username }, tokenSecret);
};
exports.createJWTToken = createJWTToken;
const userTokken = (TOKEN) => {
    const user = (0, jsonwebtoken_2.verify)(TOKEN, tokenSecret);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return user.user;
};
exports.userTokken = userTokken;

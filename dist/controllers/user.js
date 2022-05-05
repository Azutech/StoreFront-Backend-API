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
const user_1 = require("../model/user");
// import jwt from 'jsonwebtoken'
const userUX = new user_1.UserStore();
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userUX.getUsers();
        res.status(200).json({
            status: 'Success',
            message: 'User has been found',
            data: users,
        });
    }
    catch (error) {
        res.status(404).json({ message: 'Wrong User' });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        console.log(user);
        const userUI = yield userUX.createUser(user);
        res.status(200).json(userUI);
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ error: `Can't create user` });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userUX.getUserById(parseInt(req.params.id));
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(200).json('user not found');
        }
    }
    catch (error) {
        res.status(500);
        res.json(error);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const userproduct = yield userUX.checker(username);
        if (userproduct) {
            const result = yield userUX.authenticate(username, password);
            const response = {
                status: 'success',
                statusCode: 200,
                response: result
            };
            return res.status(200).json(response);
        }
        else {
            return res.status(404).json({ message: `user with ${username} not found` });
        }
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
const destroyedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userUX.deleteUser(parseInt(req.params.id));
        res.status(200).json({ status: `Deleted user ${req.params.id}` });
    }
    catch (error) {
        res.status(404).json(error);
    }
});
exports.default = { createUser, getUser, getUserById, destroyedUser, authenticate };
// const user_stores = (app: express.Application) => {
//   export default user_stores

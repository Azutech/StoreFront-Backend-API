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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../utils/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = parseInt(process.env.SALT_ROUNDS);
class UserStore {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                console.log('YEAH', result);
                const userproduct = result.rows;
                return userproduct;
            }
            catch (error) {
                throw new Error(`Can't find User ${error}`);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id =($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                console.log('YEAH', result);
                const userx = result.rows;
                return userx;
            }
            catch (error) {
                throw new Error(`Can't find User with this id:${id}, Err ${error}.`);
            }
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
                const hash = bcrypt_1.default.hashSync(user.password + pepper, saltRounds);
                const result = yield conn.query(sql, [
                    user.username,
                    user.first_name,
                    user.last_name,
                    hash,
                ]);
                const token = jsonwebtoken_1.default.sign({ user: result.rows[0] }, process.env.TOKEN_SECRET, { expiresIn: '4d' });
                conn.release();
                console.log('YEAH', result);
                const createuser = result.rows[0];
                return [{ token: token }, createuser];
            }
            catch (error) {
                throw new Error(`Could not add new user ${user.first_name}. Error: ${error}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT password FROM users WHERE username = ($1)';
                const result = yield conn.query(sql, [username]);
                if (result.rows.length) {
                    const uPassDigest = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + pepper, uPassDigest.password)) {
                        const sql = 'SELECT * FROM users WHERE username = ($1)';
                        const User = yield conn.query(sql, [username]);
                        return User.rows[0];
                    }
                }
                // const token = jwt.sign({user: result.rows[0]}, process.env.TOKEN_SECRET as string, {expiresIn: '4d'})  
                // return [{token: token }, ] 
                return null;
            }
            catch (error) {
                throw new Error(`cannot authenticate User: ${error}`);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                // const user = result.rows[0];
                return !!result;
            }
            catch (error) {
                throw new Error(`unable delete user (${id}): ${error}`);
            }
        });
    }
    checker(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE username = $1";
                const values = [username];
                const res = yield conn.query(sql, values);
                conn.release();
                return res.rows[0] ? true : false;
            }
            catch (error) {
                throw new Error(`could not connect fetch data from the db ${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;

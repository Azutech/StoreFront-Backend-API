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
exports.UserStore = void 0;
var database_1 = __importDefault(require("../utils/database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var pepper = process.env.BCRYPT_PASSWORD;
var saltRounds = parseInt(process.env.SALT_ROUNDS);
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    UserStore.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, userproduct, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        console.log('YEAH', result);
                        userproduct = result.rows;
                        return [2 /*return*/, userproduct];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Can't find User ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, userx, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users WHERE id =($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        console.log('YEAH', result);
                        userx = result.rows;
                        return [2 /*return*/, userx];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Can't find User with this id:".concat(id, ", Err ").concat(error_2, "."));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, result, token, createuser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO users (username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
                        hash = bcrypt_1["default"].hashSync(user.password + pepper, saltRounds);
                        return [4 /*yield*/, conn.query(sql, [
                                user.username,
                                user.first_name,
                                user.last_name,
                                hash,
                            ])];
                    case 2:
                        result = _a.sent();
                        token = jsonwebtoken_1["default"].sign({ user: result.rows[0] }, process.env.TOKEN_SECRET, { expiresIn: '4d' });
                        conn.release();
                        console.log('YEAH', result);
                        createuser = result.rows[0];
                        return [2 /*return*/, [{ token: token }, createuser]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Could not add new user ".concat(user.first_name, ". Error: ").concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, uPassDigest, sql_1, User, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT password FROM users WHERE username = ($1)';
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        uPassDigest = result.rows[0];
                        if (!bcrypt_1["default"].compareSync(password + pepper, uPassDigest.password)) return [3 /*break*/, 4];
                        sql_1 = 'SELECT * FROM users WHERE username = ($1)';
                        return [4 /*yield*/, conn.query(sql_1, [username])];
                    case 3:
                        User = _a.sent();
                        return [2 /*return*/, User.rows[0]];
                    case 4: 
                    // const token = jwt.sign({user: result.rows[0]}, process.env.TOKEN_SECRET as string, {expiresIn: '4d'})  
                    // return [{token: token }, ] 
                    return [2 /*return*/, null];
                    case 5:
                        error_4 = _a.sent();
                        throw new Error("cannot authenticate User: ".concat(error_4));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM users WHERE id=($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        // const user = result.rows[0];
                        return [2 /*return*/, !!result];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("unable delete user (".concat(id, "): ").concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.checker = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, values, res, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM users WHERE username = $1";
                        values = [username];
                        return [4 /*yield*/, conn.query(sql, values)];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0] ? true : false];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("could not connect fetch data from the db ".concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;

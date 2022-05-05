"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var products_1 = __importDefault(require("./controllers/products"));
var orders_1 = __importDefault(require("./controllers/orders"));
var user_1 = __importDefault(require("./controllers/user"));
var PORT = 3000;
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])());
app.get('/', function (req, res) {
    console.log("".concat(PORT, ", is the port number"));
    res.status(200).json({ message: '' });
});
(0, products_1["default"])(app);
(0, orders_1["default"])(app);
(0, user_1["default"])(app);
app.listen(PORT, function () {
    console.log("The server is running at this Port ".concat(PORT));
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    console.log(`${PORT}, is the port number`);
    res.status(200).json({ message: 'Yep!! Welcome to my Coffee' });
});
app.listen(PORT, () => {
    console.log(`The server is running at this Port ${PORT}`);
});

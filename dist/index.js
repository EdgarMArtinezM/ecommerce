"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./Routes/routes"));
const routesCar_1 = __importDefault(require("./Routes/routesCar"));
const Productos_js_1 = require("./Productos/Productos.js");
const prod = new Productos_js_1.Productos();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/carrito', routesCar_1.default);
app.use('/api/productos', routes_1.default);
app.listen(9000, () => {
    console.log('escuchando e puerto 9000');
});

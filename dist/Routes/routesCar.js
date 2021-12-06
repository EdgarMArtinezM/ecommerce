"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Carrito_1 = require("../Productos/Carrito");
const utils_1 = require("../utils");
const car = new Carrito_1.Carrito();
const routeCar = express_1.default.Router();
routeCar.get('/:id/productos', utils_1.middleware, (request, response) => {
    let id = Number(request.params.id);
    car.getByid(id).then(res => {
        response.send(res);
    });
});
routeCar.post('/', utils_1.middleware, (request, response) => {
    car.create().then(res => {
        response.send(res);
    });
});
routeCar.post('/:id/productos', utils_1.middleware, (request, response) => {
    let id = Number(request.params.id);
    let idProd = Number(request.body.idProd);
    car.saveProd(id, idProd).then(res => {
        response.send(res);
    });
});
routeCar.delete('/:id', utils_1.middleware, (request, response) => {
    let id = Number(request.params.id);
    car.deleteId(id).then(res => {
        response.send(res);
    });
});
routeCar.delete('/:id/productos/:idProd', utils_1.middleware, (request, response) => {
    let id = Number(request.params.id);
    let idProd = Number(request.params.idProd);
    car.deleteProd(id, idProd).then(res => {
        response.send(res);
    });
});
exports.default = routeCar;

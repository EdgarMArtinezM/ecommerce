"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Productos_1 = require("../Productos/Productos");
const utils_1 = require("../utils");
const prod = new Productos_1.Productos();
const route = express_1.default.Router();
route.get('/:id?', (request, response) => {
    if (request.params.id) {
        let id = Number(request.params.id);
        prod.getByid(id).then(res => {
            response.send(res);
        });
    }
    else {
        prod.getAll().then(res => {
            response.send(res);
        });
    }
});
route.post('/', utils_1.middleware, (request, response) => {
    prod.save(request.body).then(res => {
        response.send(res);
    });
});
route.put('/:id', utils_1.middleware, (request, response) => {
    let id = Number(request.params.id);
    prod.updateId(id, request.body).then(res => {
        response.send(res);
    });
});
route.delete('/:id', utils_1.middleware, (request, response) => {
    let id = Number(request.params.id);
    prod.deleteId(id).then(res => {
        response.send(res);
    });
});
exports.default = route;

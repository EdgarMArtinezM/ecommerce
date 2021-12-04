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
exports.Carrito = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const url2 = path_1.default.join(__dirname, '../Documentos/productos.json');
const urlCar = path_1.default.join(__dirname, '../Documentos/carrito.json');
class Carrito {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield fs_1.default.promises.readFile(urlCar, 'utf-8');
                let objProduct = JSON.parse(productos);
                let preparObj = {
                    id: (0, utils_1.id)(objProduct),
                    timestamp: 'hola',
                    productos: []
                };
                objProduct.push(preparObj);
                try {
                    yield fs_1.default.promises.writeFile(urlCar, JSON.stringify(objProduct, null, 2));
                    return { status: 'succes', message: preparObj.id };
                }
                catch (_a) {
                    return { status: 'error', message: 'Error no se pudo subir el producto' };
                }
            }
            catch (_b) {
                let preparObj = {
                    id: 0,
                    timestamp: 'hola',
                    productos: []
                };
                yield fs_1.default.promises.writeFile(urlCar, JSON.stringify([preparObj], null, 2));
                return { status: 'succes', message: preparObj.id };
            }
        });
    }
    getByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield fs_1.default.promises.readFile(urlCar, "utf-8");
            let obj = JSON.parse(data);
            let nuevo = obj.filter((res) => res.id === id);
            if (nuevo != 0) {
                return { status: "succes", message: nuevo[0].productos };
            }
            else {
                return { status: "error", message: "No hay ningun registro" };
            }
        });
    }
    deleteId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield fs_1.default.promises.readFile(urlCar, "utf-8");
            let obj = JSON.parse(data);
            let filtro = obj.filter((res) => res.id === id);
            if (filtro != 0) {
                let nuevo = obj.filter((res) => res.id != id);
                if (nuevo != 0) {
                    yield fs_1.default.promises.writeFile(urlCar, JSON.stringify(nuevo, null, 2));
                    return { status: "Eliminado", message: "Usuario eliminado correctamente" };
                }
                else {
                    yield fs_1.default.promises.writeFile(urlCar, JSON.stringify(nuevo, null, 2));
                    return { status: "error", message: "No existe el usuario" };
                }
            }
            else {
                return { status: "Error", message: "No se encontro ningun registro con ese id" };
            }
        });
    }
    saveProd(id, idPro) {
        return __awaiter(this, void 0, void 0, function* () {
            let prod = yield fs_1.default.promises.readFile(url2, 'utf-8');
            let carr = yield fs_1.default.promises.readFile(urlCar, 'utf-8');
            let prodJson = JSON.parse(prod);
            let carrJson = JSON.parse(carr);
            let prodUno = prodJson.filter((prod) => prod.id === idPro);
            let car = carrJson.filter((carro) => carro.id === id);
            if (prodUno.length != 0 && car.length != 0) {
                car[0].productos.push(prodUno[0].id);
                try {
                    yield fs_1.default.promises.writeFile(urlCar, JSON.stringify(carrJson, null, 2));
                    return { status: 'succes', message: 'Producto agregado' };
                }
                catch (_a) {
                    return { status: 'error', message: 'No pudimos agregar el prodsucto' };
                }
            }
            else {
                return { status: 'error', message: 'El id del producto o el id del carrito no existen' };
            }
        });
    }
    deleteProd(id, idPro) {
        return __awaiter(this, void 0, void 0, function* () {
            let carr = yield fs_1.default.promises.readFile(urlCar, 'utf-8');
            let carrJson = JSON.parse(carr);
            let car = carrJson.filter((carro) => carro.id === id);
            let nuevo = car[0].productos.map((prod) => prod).indexOf(idPro);
            car[0].productos.splice(nuevo, 1);
            if (nuevo != -1) {
                try {
                    yield fs_1.default.promises.writeFile(urlCar, JSON.stringify(carrJson, null, 2));
                    return { status: "succes", message: "Producto eliminado correctamente" };
                }
                catch (_a) {
                    return { status: "succes", message: "No se pudo eliminar el producto" };
                }
            }
            else {
                return { status: "error", message: "No se encuentra ningun producto" };
            }
        });
    }
}
exports.Carrito = Carrito;

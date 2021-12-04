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
exports.Productos = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const url2 = path_1.default.join(__dirname, '../Documentos/productos.json');
class Productos {
    save(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield fs_1.default.promises.readFile(url2, 'utf-8');
                let objProduct = JSON.parse(productos);
                if (objProduct.some((prod) => prod.nombre == obj.nombre)) {
                    return { status: 'error', message: 'Si esta el usuario' };
                }
                else {
                    let preparObj = {
                        id: (0, utils_1.id)(objProduct),
                        nombre: obj.nombre,
                        descripcion: obj.descripcion,
                        precio: obj.precio,
                        imagen: obj.imagen
                    };
                    objProduct.push(preparObj);
                    try {
                        yield fs_1.default.promises.writeFile(url2, JSON.stringify(objProduct, null, 2));
                        return { status: 'succes', message: 'El archivo se leyo correctamente' };
                    }
                    catch (_a) {
                        return { status: 'error', message: 'Error no se pudo subir el producto' };
                    }
                }
            }
            catch (_b) {
                let preparObj = {
                    id: 0,
                    nombre: obj.nombre,
                    descripcion: obj.descripcion,
                    precio: obj.precio,
                    imagen: obj.imagen
                };
                yield fs_1.default.promises.writeFile(url2, JSON.stringify([preparObj], null, 2));
                return { status: 'succes', message: 'El archivo se leyo correctamente' };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield fs_1.default.promises.readFile(url2, "utf-8");
                if (data != 0) {
                    let obje = JSON.parse(data);
                    return { status: "success", message: obje };
                }
                else {
                    return { message: 'No hay nada' };
                }
            }
            catch (e) {
                return { e };
            }
        });
    }
    getByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield fs_1.default.promises.readFile(url2, "utf-8");
            let obj = JSON.parse(data);
            let nuevo = obj.filter((res) => res.id === id);
            if (nuevo != 0) {
                return { status: "succes", message: nuevo };
            }
            else {
                return { status: "error", message: "No hay ningun registro" };
            }
        });
    }
    deleteId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield fs_1.default.promises.readFile(url2, "utf-8");
            let obj = JSON.parse(data);
            let filtro = obj.filter((res) => res.id === id);
            if (filtro != 0) {
                let nuevo = obj.filter((res) => res.id != id);
                if (nuevo != 0) {
                    yield fs_1.default.promises.writeFile(url2, JSON.stringify(nuevo, null, 2));
                    return { status: "Eliminado", message: "Usuario eliminado correctamente" };
                }
                else {
                    yield fs_1.default.promises.writeFile(url2, JSON.stringify(nuevo, null, 2));
                    return { status: "error", message: "No existe el usuario" };
                }
            }
            else {
                return { status: "Error", message: "No se encontro ningun registro con ese id" };
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield fs_1.default.promises.readFile(url2, "utf-8");
            let obj = JSON.parse(data);
            for (let x = obj.length; x > 0; x--) {
                obj.pop();
            }
            yield fs_1.default.promises.writeFile(url2, JSON.stringify(obj, null, 2));
            return { status: "Eliminados", message: "Datos eliminados correctamente" };
        });
    }
    updateId(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield fs_1.default.promises.readFile(url2, "utf-8");
                let users = JSON.parse(data);
                if (!users.some((user) => user.id === id))
                    return { status: "error", message: "No hay ningún usuario con el id especificado" };
                let result = users.map((user) => {
                    if ((user).id === id) {
                        body = Object.assign(Object.assign({ id: user.id }, body));
                        return body;
                    }
                    else {
                        return user;
                    }
                });
                try {
                    yield fs_1.default.promises.writeFile(url2, JSON.stringify(result, null, 2));
                    return { status: "success", message: "Usuario actualizado" };
                }
                catch (_a) {
                    return { status: "error", message: "Error al actualizar el usuario" };
                }
            }
            catch (_b) {
                return { status: "error", message: "Fallo al actualizar el usuario" };
            }
        });
    }
}
exports.Productos = Productos;
// const pro:Productos=new Productos();
// let obj={
//     nombre:'juano',
//     descripcion:'Modelo 20020',
//     precio:10000,
//     imagen:'imagen.png'
// }
// pro.getAll().then(res=>{
//     console.log(res)
// })

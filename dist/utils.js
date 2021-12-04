"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.id = void 0;
const express_1 = __importDefault(require("express"));
const admin = true;
const app = (0, express_1.default)();
function id(objeto) {
    try {
        if (objeto.length != 0) {
            let sig = objeto[objeto.length - 1].id + 1;
            return sig;
        }
        else {
            return 0;
        }
    }
    catch (_a) {
        return 0;
    }
}
exports.id = id;
exports.middleware = app.use((req, res, next) => {
    req.auth = admin;
    if (!req.auth) {
        res.status(403).send({ error: -2, message: 'No autorizado' });
    }
    else {
        next();
    }
});

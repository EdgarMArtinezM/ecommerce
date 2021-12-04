import express from "express";
import {Carrito} from "../Productos/Carrito";
import { middleware } from "../utils";
const car:Carrito=new Carrito();
const routeCar=express.Router();

routeCar.get('/:id',middleware,(request:express.Request,response:express.Response)=>{
    let id=Number(request.params.id)
    car.getByid(id).then(res=>{
        response.send(res)
    })
})
routeCar.post('/',middleware,(request:express.Request,response:express.Response)=>{
    car.create().then(res=>{
        response.send(res)
    })
})
routeCar.post('/:id&:idProd',middleware,(request:express.Request,response:express.Response)=>{
    let id:number=Number(request.params.id)
    let idProd=Number(request.params.idProd)
    car.saveProd(id,idProd).then(res=>{
        response.send(res)
    })
})
routeCar.delete('/:id',middleware,(request:express.Request,response:express.Response)=>{
    let id:number=Number(request.params.id)
    car.deleteId(id).then(res=>{
        response.send(res)
    })
})
routeCar.delete('delete/:id&:idProd',middleware,(request:express.Request,response:express.Response)=>{
    let id:number=Number(request.params.id)
    let idProd:number=Number(request.params.idProd)
    car.deleteProd(id,idProd).then(res=>{
        response.send(res)
    })
})

export default routeCar;
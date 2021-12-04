import express from "express";
import {Productos} from "../Productos/Productos";
import { middleware } from "../utils";
const prod:Productos=new Productos();
const route=express.Router();

route.get('/:id?',(request:express.Request,response:express.Response)=>{
    if(request.params.id){
        let id:number=Number(request.params.id)
        prod.getByid(id).then(res=>{
            response.send(res)
        })
    }else{
        prod.getAll().then(res=>{
            response.send(res)
        })
    }
})
route.post('/',middleware,(request:express.Request,response:express.Response)=>{
    prod.save(request.body).then(res=>{
        response.send(res)
    })
})
route.put('/:id',middleware,(request:express.Request,response:express.Response)=>{
    let id:number=Number(request.params.id)
    prod.updateId(id,request.body).then(res=>{
        response.send(res)
    })
})
route.delete('/:id',middleware,(request:express.Request,response:express.Response)=>{
    let id:number=Number(request.params.id)
    prod.deleteId(id).then(res=>{
        response.send(res)
    })
})

export default route;
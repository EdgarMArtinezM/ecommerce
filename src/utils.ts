import {Product} from './Interfaces/productos'
import express from 'express';
const admin = true;
const app=express();


export function id(objeto:Array<any>){
    try{
        if(objeto.length!=0){
            let sig=objeto[objeto.length-1].id+1
            return sig
        }else{
            return 0
        }
    }catch{
        return 0
    }
    
}
export const middleware=app.use((req:any,res:express.Response,next:express.NextFunction)=>{
    req.auth = admin;
    if(!req.auth){
        res.status(403).send({error:-2,message:'No autorizado'}) 
     }else{
        next();
    }
    
   
})


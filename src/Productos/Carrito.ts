import fs from 'fs'
import path from 'path'
import { id } from '../utils'
const url2=path.join(__dirname, '../Documentos/productos.json')
const urlCar=path.join(__dirname, '../Documentos/carrito.json')
export class Carrito{
    async create(){
        try{
            let productos=await fs.promises.readFile(urlCar,'utf-8')
            let objProduct=JSON.parse(productos)
            let preparObj={
                id:id(objProduct),
                timestamp: 'hola',
                productos: []
            }
            objProduct.push(preparObj)
            try{
                await fs.promises.writeFile(urlCar,JSON.stringify(objProduct,null,2))
                return {status:'succes',message:preparObj.id}
            }catch{
                return {status:'error',message:'Error no se pudo subir el producto'}
            }
            
        }catch{
            let preparObj={
                id:0,
                timestamp: 'hola',
                productos: []
            }
            await fs.promises.writeFile(urlCar,JSON.stringify([preparObj],null,2))
            return {status:'succes',message:preparObj.id}
        }
    }
    async getByid(id:number){
        let data=await fs.promises.readFile(urlCar,"utf-8")
        let obj=JSON.parse(data)
        let nuevo=obj.filter((res:any)=>res.id===id)
        if(nuevo!=0){
            return {status:"succes",message:nuevo[0].productos}
        }else{
            return {status:"error",message:"No hay ningun registro"}
        }
    }
    async deleteId(id:number){
        let data=await fs.promises.readFile(urlCar,"utf-8")
        let obj=JSON.parse(data)
        let filtro=obj.filter((res:any)=>res.id===id)
        if(filtro!=0){
            let nuevo=obj.filter((res:any)=>res.id!=id)
            if(nuevo!=0){
                await fs.promises.writeFile(urlCar, JSON.stringify(nuevo, null, 2))
                return {status:"Eliminado",message:"Usuario eliminado correctamente"}
            }else{
                await fs.promises.writeFile(urlCar, JSON.stringify(nuevo, null, 2))
                return {status:"error",message:"No existe el usuario"}
            }
        }else{
            return {status:"Error",message:"No se encontro ningun registro con ese id"}
        }
    }
    async saveProd(id:number,idPro:number){
        let prod=await fs.promises.readFile(url2,'utf-8');
        let carr=await fs.promises.readFile(urlCar,'utf-8');
        let prodJson=JSON.parse(prod)
        let carrJson=JSON.parse(carr)
        let prodUno:any=prodJson.filter((prod:any)=>prod.id===idPro)
        let car:any=carrJson.filter((carro:any)=>carro.id===id)
        if(prodUno.length!=0 && car.length!=0){
            car[0].productos.push(prodUno[0].id)
                try{
                    await fs.promises.writeFile(urlCar,JSON.stringify(carrJson,null,2))
                    return {status:'succes',message:'Producto agregado'}
                }catch{
                    return {status:'error',message:'No pudimos agregar el prodsucto'}
                }
            
        }else{
            return {status:'error',message:'El id del producto o el id del carrito no existen'}
        }
    }
    async deleteProd(id:number,idPro:number){
        let carr=await fs.promises.readFile(urlCar,'utf-8');
        let carrJson=JSON.parse(carr)
        let car:any=carrJson.filter((carro:any)=>carro.id===id)
        let nuevo=car[0].productos.map((prod:any) => prod).indexOf(idPro)
        car[0].productos.splice(nuevo,1);
        if(nuevo!=-1){
             try{
                await fs.promises.writeFile(urlCar, JSON.stringify(carrJson, null, 2))
                return {status:"succes",message:"Producto eliminado correctamente"}
            }catch{
                return {status:"succes",message:"No se pudo eliminar el producto"}
            }
        }else{
            return {status:"error",message:"No se encuentra ningun producto"}
        }
       
    }
    
}


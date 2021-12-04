import fs from 'fs'
import path from 'path'
import {Product} from '../Interfaces/productos'
import { id } from '../utils'
const url2=path.join(__dirname, '../Documentos/productos.json')
export class Productos{
    async save(obj:Product){
        try{
            let productos=await fs.promises.readFile(url2,'utf-8')
            let objProduct=JSON.parse(productos)
            if(objProduct.some((prod:Product)=>prod.nombre==obj.nombre)){
                return {status:'error',message:'Si esta el usuario'}
            }else{
                let preparObj:Object={
                    id:id(objProduct),
                    nombre: obj.nombre,
                    descripcion: obj.descripcion,
                    precio: obj.precio,
                    imagen: obj.imagen
                }
                objProduct.push(preparObj)
                try{
                    await fs.promises.writeFile(url2,JSON.stringify(objProduct,null,2))
                    return {status:'succes',message:'El archivo se leyo correctamente'}
                }catch{
                    return {status:'error',message:'Error no se pudo subir el producto'}
                }
            }
        }catch{
            let preparObj:Object={
                id:0,
                nombre: obj.nombre,
                descripcion: obj.descripcion,
                precio: obj.precio,
                imagen: obj.imagen
            }
            await fs.promises.writeFile(url2,JSON.stringify([preparObj],null,2))
            return {status:'succes',message:'El archivo se leyo correctamente'}
        }
    }
    async getAll(){
        try{
            let data:any = await fs.promises.readFile(url2, "utf-8")
            if(data!=0){
                let obje = JSON.parse(data)
                return {status:"success", message:obje}
            }else{
                return {message:'No hay nada'}
            }
        }catch (e){
            return {e}
        }
    }
    async getByid(id:number){
        let data=await fs.promises.readFile(url2,"utf-8")
        let obj=JSON.parse(data)
        let nuevo=obj.filter((res:any)=>res.id===id)
        if(nuevo!=0){
            return {status:"succes",message:nuevo}
        }else{
            return {status:"error",message:"No hay ningun registro"}
        }
    }
    async deleteId(id:number){
        let data=await fs.promises.readFile(url2,"utf-8")
        let obj=JSON.parse(data)
        let filtro=obj.filter((res:any)=>res.id===id)
        if(filtro!=0){
            let nuevo=obj.filter((res:any)=>res.id!=id)
            if(nuevo!=0){
                await fs.promises.writeFile(url2, JSON.stringify(nuevo, null, 2))
                return {status:"Eliminado",message:"Usuario eliminado correctamente"}
            }else{
                await fs.promises.writeFile(url2, JSON.stringify(nuevo, null, 2))
                return {status:"error",message:"No existe el usuario"}
            }
        }else{
            return {status:"Error",message:"No se encontro ningun registro con ese id"}
        }
    }
    async deleteAll(){
        let data=await fs.promises.readFile(url2,"utf-8")
        let obj=JSON.parse(data)

        for(let x=obj.length;x>0;x--){
            obj.pop();
        }
        await fs.promises.writeFile(url2, JSON.stringify(obj, null, 2))
        return {status:"Eliminados",message:"Datos eliminados correctamente"}

    }
    async updateId(id:number,body:Product){
        try{
            let data = await fs.promises.readFile(url2,"utf-8")
            let users = JSON.parse(data);
            if(!users.some((user:any)=>user.id===id)) return {status:"error", message:"No hay ningún usuario con el id especificado"}
            let result = users.map((user:any)=>{
                if((user).id===id){
                        body = Object.assign({id:user.id,...body})
                        return body;
                }else{
                    return user;
                }
            })
            try{
                await fs.promises.writeFile(url2,JSON.stringify(result,null,2));
                return {status:"success", message:"Usuario actualizado"}
            }catch{
                return {status:"error", message:"Error al actualizar el usuario"}
            }
        }catch{
            return {status:"error",message:"Fallo al actualizar el usuario"}
        }
    }
}

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

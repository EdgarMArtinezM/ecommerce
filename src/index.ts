import express from 'express';
import route from './Routes/routes';
import routeCar from './Routes/routesCar';
import fs from 'fs';
import { Productos } from './Productos/Productos.js';
const prod:Productos=new Productos();
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/carrito',routeCar)
app.use('/api/productos',route)

app.listen(9000,()=>{
    console.log('escuchando e puerto 9000')
})

//const express = require("express"); // sintaxis CommonJS para importar (antigua)

import express from 'express'; // sintaxis ESM 
import conectarDB from './config/db.js'; /*Como es un archivo creado por mi debo incluir la extension del archivo a diferencia de las dependencias */
import dotenv from 'dotenv';
import cors from 'cors'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'


const app = express();
app.use(express.json()); //Para procesar la informacion tipo json que se recibe del formulario

dotenv.config() // buscara por el archivo .env

conectarDB();

// Configurar CORS

const whitelist = [process.env.FRONTEND_URL] //este backend aceptara conexiones de esta url

const corsOptions = {
    // El paquete cors crea la variable de origin y podemos comprobar si ese origen esta dentro de mi whitelist
    origin: function (origin, callback){
        if(whitelist.includes(origin)){
            //Puede Consultar la API
            callback(null, true)
        }else{
            //No puede consultar la API
            callback(new Error("Error de Cors"))
        }
    }
}

app.use(cors(corsOptions));




/* Routing  
    Accedo al routing de express que me permitira crear mis endpoints, antes debo crear una carpeta routes y dentro crear un archivo usuarioRoutes.js y es en ese archivo donde importare el router de express que es donde podre definir los verbos http get post...

*/

//ruta controlador
app.use("/api/usuarios", usuarioRoutes) // .use soporta todos los verbos http por lo tanto podemos asociar el route (usuarioRoutes hacia el endpoint /api/usuarios)
app.use("/api/proyectos", proyectoRoutes)
app.use("/api/tareas", tareaRoutes)

const PORT = process.env.PORT || 4000; //variable para produccion

const servidor = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
}) /* Esta funcion correra gracias a que en el archivo package.json en la seccion de scripts habilite el comando node index.js con el que podre ejecutar npm run dev */


// Socket IO

import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
})

io.on('connection', (socket) => {
    console.log('Conectado a socket.io')

    // Definir los eventos de socket io
    socket.on("abrir proyecto", (proyecto) => {
        socket.join(proyecto)
    })

    socket.on("nueva tarea", (tarea) => {
        const proyecto  = tarea.proyecto
        socket.on(proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })

    socket.on('actualizar tarea', (tarea) => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea actualizada', tarea)
    })

    socket.on('cambiar estado', (tarea) => {
        const proyecto = tarea.proyecto._id;

        socket.to(proyecto).emit('nuevo estado', tarea)
    })

})
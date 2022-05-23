//const express = require("express"); // sintaxis CommonJS para importar (antigua)

import express from 'express'; // sintaxis ESM 
import conectarDB from './config/db.js'; /*Como es un archivo creado por mi debo incluir la extension del archivo a diferencia de las dependencias */
import dotenv from 'dotenv';


const app = express();

dotenv.config() // buscara por el archivo .env

conectarDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto 4000 ${PORT}`)
}) /* Esta funcion correra gracias a que en el archivo package.json en la seccion de scripts habilite el comando node index.js con el que podre ejecutar npm run dev */
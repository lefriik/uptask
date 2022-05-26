import express from 'express';
import { registrar } from '../controllers/usuarioController.js'

const router = express.Router(); 

/*  
    todos los verbos apuntan a la misma url a la cual fueron llamados en el index.js /api/usuarios

    las apis deben entregar respuestas de tipo json

*/


// autenticacion, Registro y Confirmacion de usuarios
router.post('/', registrar); // Crea un nuevo usuario




export default router;
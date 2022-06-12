import express from 'express';
import { 
    registrar, 
    autenticar, 
    confirmar, 
    olvidePassword, 
    comprobarToken, 
    nuevoPassword,
    perfil,
} from '../controllers/usuarioController.js'

const router = express.Router(); 

/*  
    todos los verbos apuntan a la misma url a la cual fueron llamados en el index.js /api/usuarios

    las apis deben entregar respuestas de tipo json

    Usamos postman para probar los ENDPOINTS de la APP (simula request)

*/

import checkAuth from '../middleware/checkAuth.js'


// --------------------------------- Rutas Publicas ----------------------------------------

// autenticacion, Registro y Confirmacion de usuarios
router.post('/', registrar); // Crea un nuevo usuario. La diagonal hace referencia a la misma url que se le indica en el index. Registrar es una funcion del controlador de usuario de esta manera puedo separar aun mas el codigo y tenerlo mas ordenado


router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar); //de esta manera generamos routing dinamico con express
router.post('/olvide-password', olvidePassword);

//cuando las rutas son iguales pero los verbos a los que responde son distintos podemos escribir de la siguiente manera:
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);


router.get("/perfil", checkAuth, perfil ) //Primero ejecuta el middleware y luego a la funcion de perfil




export default router;

/*

    UN JWT JASON WEB TOKEN tiene un header, un payload el cual serian los datos y finalmente una firma. No se recomiendan para almacenar tarjetas de credito o password.

    Podemos generarlos con la dependencia

    npm i jsonwebtoken

    

*/

import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
    //genera un objeto con el id del usuario
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d", // cuanto durara ese JWT
    }) //metodo que permite generar un jwt. toma como primer parametro el objeto que queremos firmar y 2 parametro toma la llave privada la cual se recomienda almacenar en las variables de entorno. Esta palabra secreta sirve para firmar y comprobar el JWT. y como 3 parametro toma un objeto de configuracion con opciones. Luego importamos la funcion de generar JWT en usuarioController.

    //En jwt.io podemos pegar el token generado y en payload podemos ver la informacion del objeto 
}

export default generarJWT;
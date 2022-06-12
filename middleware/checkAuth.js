import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';


//Los middleware son ideales para proteger las rutas de la API 
const checkAuth = async (req, res, next) => { 

    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer") 
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]; /*Utilizamos split para que divida el string por el espacio que genera el "Bearer Token"  ya que bearer es solo una convencion por lo tanto necesitamos el token que al dividirse queda en la posicion 1 del arreglo */

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v"); /*selecciono campos que no necesito que se muestren */

            return next();
        } catch (error) {
            return res.status(404).json({ msg: 'Hubo un error '})
        }
    }

    if(!token){
        const error = new Error('Token no Valido');
        return res.status(401).json({ msg: error.message });
    }

    next(); //next permite ir al siguiente middleware
};

export default checkAuth;


/*

Enviamos el JWT mediante los headers, en postman podemos hacerlo desde 
Authorization -> type -> Bearer Token

*/
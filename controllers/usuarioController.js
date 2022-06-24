//Aqui es donde definimos toda la funcionalidad  que va a comunicar routing con modelo. Todo se hace por medio del controlador

//Es necesario importar el modelo dentro del controlador
import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js"

const registrar = async (req, res) => {

    // Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email }) //encuentra el primero que coincida con el email

    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario(req.body) //crea un nuevo objeto tipo usuario con la info del modelo
        usuario.token = generarId();
        await usuario.save() //almacena en bd

        //Enviar el email de confirmacion
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({ msg: "Usuario almacenado correctamente. Revisa tu email para confirmar tu cuenta" });
      
    } catch (error) {
        console.log(error)
    }

    
}

const autenticar = async (req, res) => {
    const { email, password } = req.body

    //COMPROBAR SI EL USUARIO EXISTE
    const usuario = await Usuario.findOne({ email })
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }


    //COMPROBAR SI EL USUARIO ESTA CONFIRMADO
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }


    //COMPROBAR SU PASSWORD
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id), //generamos el token 
        })
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(404).json({ msg: error.message });
    }

}

const confirmar = async (req, res) => {
    
    const { token } = req.params // accedo a valores de la url
    const usuarioConfirmar = await Usuario.findOne({ token }) //busco usuario con ese token

    if(!usuarioConfirmar){
        const error = new Error('Token no Valido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = ""; //eliminamos el token porque es de 1 solo uso
        await usuarioConfirmar.save(); //almacena al usuario confirmado con los cambios
        res.json({msg: "Usuario Confirmado Correctamente"})

    } catch (error) {
        console.log(error)
    }

    console.log(usuarioConfirmar)
}

const olvidePassword = async (req, res) => {

    const { email } = req.body;
    //COMPROBAR SI EL USUARIO EXISTE
    const usuario = await Usuario.findOne({ email })
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save();

        //enviar email
        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({ msg: "Hemos enviado un email con las instrucciones" })
    } catch (error) {
        console.log(error)
    }

}


const comprobarToken = async (req, res) => {

    const { token } = req.params //extraigo valores de la url

    const tokenValido = await Usuario.findOne({ token });

    if(tokenValido){
        res.json({ msg: 'Token Valido y el usuario existe' })
    }else{
        const error = new Error('Toke no Valido')
        return res.status(404).json({ msg: error.message })
    }

}

const nuevoPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });

    if(usuario){
        usuario.password = password;
        usuario.token = ""
        try {
            await usuario.save();
            res.json({ msg: "Password Modificado Correctamente "})
            
        } catch (error) {
            console.log(error)
        }
        
    }else{
        const error = new Error('Toke no Valido')
        return res.status(404).json({ msg: error.message })
    }


}

const perfil = async (req, res) => {
    const { usuario } = req;

    res.json(usuario);
}


export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}



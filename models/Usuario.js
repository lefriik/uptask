import mongoose from "mongoose";
import bcrypt from "bcrypt";// hashear password

// El modelo es quien interactua directamente con la base de datos

// schema es la estructura de la base de datos

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
},{
    timestamps: true, //crea 2 columnas (creado y actualizado)
} );

/* Middleware es un codigo que se ejecuta entremedio de que algo suceda en el caso del pre, sera un codigo que se ejecuta antes de que se guarde en la base de datos y el caso de post sera un codigo que sucedera despues de cierta accion */

usuarioSchema.pre('save', async function(next) { //hash de password
    if(!this.isModified("password")){ /* Funcion de mongoose que revisa que no haya hecho cambios en el password */
        next(); //envia al siguiente middleware
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
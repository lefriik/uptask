import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI, //variable de entorno bd
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB Conectado en: ${url}`)

        
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1) // va a forzar a que terminen todos los procesos
    }
}

export default conectarDB;
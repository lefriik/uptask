const generarId = () => {

    const random = Math.random().toString(32).substring(2);

    //El 32 de toString se le llama radix y hace que combine entre numeros y caracteres.

    const fecha = Date.now().toString(32);

    return random + fecha;


}

export default generarId;
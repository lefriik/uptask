import nodemailer from "nodemailer"


export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;

    //TODO: Mover hacia un cliente axios
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7456b37839a342",
          pass: "4fff26903ce8e0"
        }
      });

      //informacion del mail
      const info = await transport.sendMail({
        from: '"Emerio - Administrador de proyectos" <cuentas@emerio.com>',
        to: email,
        subject: "Uptask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en Uptask",
        html: `<p>Hola: ${nombre} Comprueba tu cuenta en Uptask</p>
        <p>Tu cuenta esta casi lista solo debes comprobarla en el siguiente enlace: </p>
  
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
  
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        
        
        `,


      
      })
}

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;


  // TODO: Mover hacia variables de entorno
  const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7456b37839a342",
        pass: "4fff26903ce8e0"
      }
    });

    //informacion del mail
    const info = await transport.sendMail({
      from: '"Emerio - Administrador de proyectos" <cuentas@emerio.com>',
      to: email,
      subject: "Uptask - Reestablece tu password",
      text: "Reestablece tu password",
      html: `<p>Hola: ${nombre} Has solicitado reestablecer tu password</p>
      <p>Sigue el siguiente enlace para generar un password: </p>

      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>

      <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
      
      
      `,

    })
}
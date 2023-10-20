import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
        "sandbox.smtp.mailtrap.io",
        2525,
        "13fecf5ee9c6bd",
        "a292f1da6ab0a8"
    )

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon',
        to: email,
        subject: "AppSalon - Confirma tu cuenta",
        text: "AppSalon - Confirma tu cuenta",
        html: `<p>Hola ${name}, confirma tu cuenta en AppSalon</p>
        <p>Tu cuenta está casi lista, solo debes confirmarla en el siguiente enlace</p>
        <a href="http://localhost:4000/api/auth/verify/${token}">Confirmar cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })

    console.log('Mensaje enviado', info.messageId);
}
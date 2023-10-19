import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification() {
    const transporter = createTransport(
        "sandbox.smtp.mailtrap.io",
        2525,
        "13fecf5ee9c6bd",
        "a292f1da6ab0a8"
    )

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon',
        to: 'correo@correo.com',
        subject: "AppSalon - Confirma tu cuenta",
        text: "AppSalon - Confirma tu cuenta",
        html: "Probando email"
    })

    console.log('Mensaje enviado', info.messageId);
}
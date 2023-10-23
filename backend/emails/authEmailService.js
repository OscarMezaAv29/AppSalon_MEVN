import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({name, email, token}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
    )

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon <cuentas@appsalon.com>',
        to: email,
        subject: "AppSalon - Confirma tu cuenta",
        html: `
            <div style="text-align: center; background-color: #f2f2f2; padding: 20px;">
                <h2 style="color: #333;">AppSalon - Confirma tu cuenta</h2>
                <p>Hola ${name}, confirma tu cuenta en AppSalon</p>
                <p>Tu cuenta está casi lista, solo debes confirmarla en el siguiente enlace</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Confirmar cuenta</a>
                <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
            </div>
        `
    });
    

    console.log('Mensaje enviado', info.messageId);
}
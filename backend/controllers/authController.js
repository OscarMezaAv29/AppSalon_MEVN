import User from "../models/User.js";
import { sendEmailVerification } from "../emails/authEmailService.js";

const register = async (req, res) => {

    // Valida todos los campos
    if(Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')

        return res.status(400).json({
            msg: error.message
        })
    }

    const { email, password, name } = req.body
    // Evitar registros duplicados
    const userExists = await User.findOne({ email })
    if(userExists) {
        const error = new Error('Usuario ya registrado')

        return res.status(400).json({
            msg: error.message
        })
    }

    // validar la extensión del password
    const MIN_PASSWORD_LENGTH = 8
    if(password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`El password debe contener al menos ${MIN_PASSWORD_LENGTH} caracteres`)

        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const user = new User(req.body)
        const result = await user.save()

        const { name, email, token } = result
        sendEmailVerification({
            name,
            email,
            token
        })

        res.json({
            msg: 'El usuario se creó correctamente, revisa tu email'
        })
    } catch (error) {
        console.log(error);
    }
}

const verifyAccount = async(req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Hubo un error, token no válido')
        return res.status(401).json({msg: error.message})
    }

    // Si el token es válido, confirmar la cuenta
    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({msg: 'Usuario Confirmado Correctamente'})
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    // Revisar que el usuario exista
    const user = await User.findOne({email})
    if(!user) {
        const error = new Error('El usuario no existe')
        return res.status(401).json({msg: error.message})
    }

    // Revisar si el usuario confirmó su cuenta
    if(!user.verified) {
        const error = new Error('Tu cuenta no ha sido confirmada aún')
        return res.status(401).json({msg: error.message})
    }


    // Comprobar el password
}


export {
    register,
    verifyAccount,
    login
}
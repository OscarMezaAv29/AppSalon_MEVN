import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'

// Variables de entorno
dotenv.config()

// Configurar la aplicación
const app = express() 

// Leer datos vía body
app.use(express.json())

// Conectar a BD
db()


// Configurar CORS
const whiteList = [process.env.FRONTEND_URL]

if(process.argv[2] === '--postman') {
    whiteList.push(undefined)
}

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            // Permite la conexión
            callback(null, true)
        } else {
            // No permitir la conexión
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))


// Definir una ruta
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)

// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar la App
app.listen(PORT, () => {
    console.log(colors.blue('El servidor se está ejecutando en el puerto: '), colors.blue.bold(PORT));
})

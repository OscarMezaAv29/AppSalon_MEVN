import express from 'express'

// Configurar la aplicación
const app = express() 

// Definir una ruta
app.get('/', (req, res) => {
    const products = [
        {
            id: 1,
            price: 30,
            name: 'Laptop'
        },
        {
            id: 2,
            price: 40,
            name: 'Monitor'
        }
    ]
    res.json(products)
})


// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar la App
app.listen(PORT, () => {
    console.log('El servidor se está ejecutando en el puerto: ', PORT);
})
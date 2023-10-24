import mongoose from 'mongoose'

const appointmenSchema = mongoose.Schema({
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Services'
        }
    ],
    date: {
        type: Date
    },
    time: {
        type: String
    },
    totalAmount: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Appointment = mongoose.model('Appointment', appointmenSchema)


export default Appointment
import {Schema, model, models} from 'mongoose'

const deviceSchema = new Schema({
    device_id: {
        type: Number,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: [true, 'Se requiere especificar el modelo'],
        trim: true
    },
    state: {
        type: ["Disponible", "Fuera de operacion", "Reservado"],
        required: true
    },
    battery: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
})

export default models.Device || model('Device', deviceSchema)
import {dbConnect} from '@/app/utils/database'
import Device from '@/models/device'

dbConnect();

export default async (req, res) => {

    const {method, body, query: {id}} = req;

    switch (method) {
        case "GET":
            try {
                const device = await Device.findById(id)
                if(!device) return res.status(404).json({msg: "Device not found"})
                return res.status(200).json(device)
            } catch (error) {
                return res.status(500).json({msg: "No puedo obtener ese id"});
            }
            
        case "PUT":
            try {
                const device = await Device.findByIdAndUpdate(id, body);
                if(!device) return res.status(404).json({msg: "Device not found"})
                return res.status(200).json(device);
            } catch (error) {
                return res.status(404).json({msg: error.message})
            }
        case "DELETE":
            try {
                const deletedDevice = await Device.findByIdAndDelete(id);
                if(!deletedDevice) return res.status(404).json({msg: "Device not found"})
                return res.status(204).json();
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "El metodo no esta soportado"})
    }

    return res.status(200).json("Received")
}
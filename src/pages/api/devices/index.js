import { dbConnect } from '@/app/utils/database';
import Device from '@/models/device';

dbConnect()

export default async function handler(req, res) {

    const {method, body} = req

    switch (method) {
        case "GET":
            try {
                const devices = await Device.find();
                return res.status(200).json(devices);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
            

        case "POST":
            try {
                const newDevice = new Device(body);
                const savedDevice = await newDevice.save()
                return res.status(201).json(savedDevice)
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        default:
            return res.status(400).json({msg: "Este metodo no esta soportado."});
    }

    
}
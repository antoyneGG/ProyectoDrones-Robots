import {dbConnect} from '@/app/utils/database'
import User from '@/models/user'

dbConnect()

export default async (req, res) => {

    const {method, body, query: {username}} = req;

    switch (method) {
        case "GET":
            try {
                const user = await User.find({},{username: username})
                const findedUser = await User.findById(user[0]._id)
                if(!findedUser) return res.status(404).json({msg: "Device not found"})
                return res.status(200).json(findedUser)
            } catch (error) {
                return res.status(500).json({msg: "No puedo obtener ese id"});
            }
            
        case "PUT":
            try {
                const user = await User.find({},{username: username})
                await User.findByIdAndUpdate(user[0]._id, body);
                if(!user) return res.status(404).json({msg: "Device not found"})
                return res.status(200).json(user);
            } catch (error) {
                return res.status(404).json({msg: error.message})
            }
        case "DELETE":
            try {
                const deletedUser = await User.find({},{username: username})
                await User.findByIdAndDelete(deletedUser[0]._id);
                if(!deletedUser) return res.status(404).json({msg: "Device not found"})
                return res.status(204).json();
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "El metodo no esta soportado"})
    }

    return res.status(200).json("Received")
}
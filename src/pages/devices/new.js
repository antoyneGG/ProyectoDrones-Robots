import {Grid, Form, Button} from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Query } from 'mongoose'

export default function DeviceFormPage() {

    const [newDevice, setNewDevice] = useState({
        device_id: 5,
        model: "",
        state: "Disponible",
        battery: 100
    })

    const [errors, setErrors] = useState({})

    const {query, push, back} = useRouter()

    const validate = () => {
        const errors = {}

        if(!newDevice.model) errors.model = "Model is required";

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = validate()
        console.log("si entro aca")

        if(Object.keys(errors).length) return setErrors(errors)

        if(query.id){
            await updateDevice()
            console.log("si existe")
        } else {
            await createDevice()
            console.log("no existe, creelo")
        }

        await back()
    }

    const createDevice = async () => {
        try {
            fetch('http://localhost:3000/api/devices', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newDevice)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const updateDevice = async () => {
        try {
            fetch('http://localhost:3000/api/devices/' + query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newDevice)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => setNewDevice({...newDevice, [e.target.name]: e.target.value})

    const getDevice = async () => {
        const res = await fetch('http://localhost:3000/api/devices/' + query.id)
        const data = await res.json()
        setNewDevice({device_id: data.device_id, model: data.model, state: data.state, battery: data.battery})
    }

    useEffect(() => {
        if(query.id) {
            getDevice()
        }
    }, [])

  return (
    <Grid centered verticalAlign='middle' columns={3} style={{height: "80vh"}}>
        <Grid.Row>
            <Grid.Column textAlign='center'>
                <h1>{query.id ? 'Actualizar dispositivo' : 'Agregar dispositivo'}</h1>
                {query.id ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Input label="Estado" placeholder="Estado" name="state" onChange={handleChange} error={errors.state ? {content: "Ingresa el nuevo estado", pointing: "below"} : null} value={newDevice.state}/>
                        <Form.Input label="Bateria" placeholder="Bateria" name="battery" onChange={handleChange} error={errors.battery ? {content: "Ingresa la nueva bateria", pointing: "below"} : null} value={newDevice.battery}/>
                        <Button primary>{query.id ? 'Actualizar' : 'Crear'}</Button>
                    </Form>
                ) :  (<Form onSubmit={handleSubmit}>
                    <Form.Input label="Modelo" placeholder="Modelo" name="model" onChange={handleChange} error={errors.model ? {content: "Ingresa un nombre de modelo", pointing: "below"} : null} value={newDevice.model}/>
                    <Button primary>{query.id ? 'Actualizar' : 'Crear'}</Button>
                </Form>)}
            </Grid.Column>
        </Grid.Row>
    </Grid>
  )
}

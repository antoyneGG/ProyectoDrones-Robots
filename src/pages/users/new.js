import {Grid, Form, Button} from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Query } from 'mongoose'

export default function UserFormPage() {

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        email: ""
    })

    const [errors, setErrors] = useState({})

    const {query, push, back} = useRouter()

    const validate = () => {
        const errors = {}

        if(!newUser.username) errors.username = "Username is required";

        if(!newUser.password) errors.password = "Password is required";

        if(!newUser.email) errors.email = "Email is required";

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = validate()

        if(Object.keys(errors).length) return setErrors(errors)
        console.log("no entraaa")
        if(query.username){
            console.log("updateeee")
            await updateUser()
        } else {
            await createUser()
        }

        await back()
    }

    const createUser = async () => {
        try {
            fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const updateUser = async () => {
        try {
            fetch('http://localhost:3000/api/users/' + query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => setNewUser({...newUser, [e.target.name]: e.target.value})

    const getUser = async () => {
        const res = await fetch('http://localhost:3000/api/users/' + query.id)
        const data = await res.json()
        setNewUser({username: data.username, password: data.password, email: data.email})
    }

    useEffect(() => {
        if(query.username) {
            getUser()
        }
    }, [])

  return (
    <Grid centered verticalAlign='middle' columns={3} style={{height: "80vh"}}>
        <Grid.Row>
            <Grid.Column textAlign='center'>
                <h1>{query.username ? 'Actualizar usuario' : 'Agregar usuario'}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Input label="Nombre de usuario" placeholder="Nombre de usuario" name="username" onChange={handleChange} error={errors.username ? {content: "Ingresa un nombre de usuario", pointing: "below"} : null} value={newUser.username}/>
                    <Form.Input label="Contrasenia" placeholder="Contrasenia" name="password" onChange={handleChange} error={errors.password ? {content: "Ingresa una contrasenia", pointing: "below"} : null} value={newUser.password}/>
                    <Form.Input label="Email" placeholder="Email" name="email" onChange={handleChange} error={errors.email ? {content: "Ingresa un email", pointing: "below"} : null} value={newUser.email}/>
                    <Button primary>{query.username ? 'Actualizar' : 'Crear'}</Button>
                </Form>
            </Grid.Column>
        </Grid.Row>
    </Grid>
  )
}

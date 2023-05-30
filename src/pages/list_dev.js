import {Button, Card, Container, Grid, Confirm} from 'semantic-ui-react'
import { useState } from 'react'
import DeleteDevice from './devices/delete'
import { useRouter } from 'next/router'
 
export default function HomePage({devices}) {

    const [confirm, setConfirm] = useState(false)

    const [targetDevice, setTargetDevice] = useState(null)

    const router = useRouter()

    const open = (id) => {
        setConfirm(true)
        setTargetDevice(id)
        console.log(targetDevice)
    }
    const close = () => setConfirm(false)
    
    if(devices.length == 0) return (
        <Grid centered verticalAlign='middle' columns={1} style={{height: "80vh" }}>
            <Grid.Row>
                <Grid.Column textAlign='centered'>
                    <h1>No se encuentra dispositivos</h1>
                    <img src='https://cdn.dribbble.com/users/988145/screenshots/3462363/drone-dribbb.gif'/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

    return (
        <Container style={{padding: '20px'}}>
            <Card.Group itemsPerRow={4}>
                {
                    devices.map(device => (
                        <Card key={device.device_id}>
                            <Card.Content>
                                <Card.Header>
                                    {device.model}
                                </Card.Header>
                                <p>
                                    {`Estado: ` + device.state}
                                </p>
                                <p>
                                    {`Bateria: ` + device.battery + `%`}
                                </p>
                            </Card.Content>
                            <Card.Content>
                                <Button primary onClick={() => router.push(`/devices/${device._id}`)}>Editar</Button>
                                <Button color='red' onClick={() => open(device._id)}>Eliminar</Button>
                            </Card.Content>
                        </Card>
                    ))
                }
            </Card.Group>
            <Confirm open={confirm} onConfirm={() => {console.log(targetDevice); DeleteDevice(targetDevice); close(); router.reload(window.location.pathname);}} onCancel={close}/>
        </Container>
    )
}

export const getServerSideProps = async (ctx) => {

    const res = await fetch('http://localhost:3000/api/devices')
    const devices = await res.json()

    return {
        props: {
            devices
        }
    }
}



/*
export async function getServerSideProps() {

  const res = await fetch('http://localhost:3000/api/devices')
  const devices = await res.json()

  console.log(devices)

  return {
    props: {}
  }
}
*/

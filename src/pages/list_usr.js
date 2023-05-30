import {Button, Card, Container, Grid, Confirm} from 'semantic-ui-react'
import { useState } from 'react'
import { useRouter } from 'next/router'
 
export default function HomePage({users}) {

    const router = useRouter()
    
    if(users.length == 0) return (
        <Grid centered verticalAlign='middle' columns={1} style={{height: "80vh" }}>
            <Grid.Row>
                <Grid.Column textAlign='centered'>
                    <h1>No se encuentran usuarios</h1>
                    <img src='https://cdn-icons-png.flaticon.com/512/5894/5894032.png'/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

    return (
        <Container style={{padding: '20px'}}>
            <Card.Group itemsPerRow={4}>
                {
                    users.map(user => (
                        <Card key={user._id}>
                            <Card.Content>
                                <Card.Header>
                                    {user.username}
                                </Card.Header>
                                <p>
                                    {`Email: ` + user.email}
                                </p>
                            </Card.Content>
                            <Card.Content>
                                <Button primary onClick={() => router.push(`/users/${user.username}`)}>Ver</Button>
                                <Button secondary onClick={() => router.push(`/users/${user.username}/edit`)}>Editar</Button>
                            </Card.Content>
                        </Card>
                    ))
                }
            </Card.Group>
        </Container>
    )
}

export const getServerSideProps = async (ctx) => {

    const res = await fetch('http://localhost:3000/api/users')
    const users = await res.json()
    console.log(users)

    return {
        props: {
            users
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

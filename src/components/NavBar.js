import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import {useNavigate} from 'react-dom'
import Link from 'next/link'

export const NavBar = () => {

    const router = useRouter()

    const {pathname} = router;

    console.log(pathname)

  return (
    <Menu inverted borderless attached color='grey'>
        <Container>
            {pathname != '/' && (
                <Menu.Item>
                    <Button circular color="grey" size="mini" onClick={() => router.back()} ><img src='https://cdn-icons-png.flaticon.com/512/60/60577.png' alt="" width="40" height="40"/></Button>
                </Menu.Item>
            )}
            <Menu.Menu position="right">
                {pathname === '/list_dev' && (
                    <Menu.Item>
                        <Button primary size="mini" onClick={() => router.push('/devices/new')} >Agregar dispositivo</Button>
                    </Menu.Item>
                )}
                {pathname === '/list_usr' && (
                    <Menu.Item>
                        <Button primary size="mini" onClick={() => router.push('/users/new')} >Agregar usuario</Button>
                    </Menu.Item>
                )}
                {pathname === '/home' && ([
                    <Menu.Item>
                        <Button primary size="mini" onClick={() => router.push('/list_dev')} >Gestionar dispositivos</Button>
                    </Menu.Item>,
                    <Menu.Item>
                        <Button primary size="mini" onClick={() => router.push('/list_usr')} >Gestionar usuarios</Button>
                    </Menu.Item>,
                    <Menu.Item>
                        <Button primary size="mini" onClick={() => router.push('/')} >Gestionar reservas</Button>
                    </Menu.Item>
                ])}
            </Menu.Menu>
        </Container>
    </Menu>
  )
}
"use client"

import React from "react"
import { Container, Menu } from "semantic-ui-react"
import LoggedIn from "./LoggedIn"
import { Link } from "react-router-dom"

const TopMenu = ({ data, userData }: { data: any; userData: any }) => (
  <Menu className={"navStyle"}>
    <Container>
      {data.user?.id ? (
        <>
          <Menu.Item
            header
            as={Link}
            to='/dashboard/'
            name='PrintVault'
            link={true}
          />
          <Menu.Item as={Link} to='/files/' name='Files' link={true} />
          <Menu.Item as={Link} to='/projects/' name='Projects' link={true} />
          <Menu.Item as={Link} to='/tools/' name='Tools' link={true} />
          <Menu.Item as={Link} to='/account/' name='Account' link={true} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <LoggedIn userData={userData} />
            </Menu.Item>
          </Menu.Menu>
        </>
      ) : (
        <>
          <Menu.Item header as={Link} to='/' name='PrintVault' link={true} />
          {/* <Menu.Item as='a' href='/'>
          Login
        </Menu.Item> */}
        </>
      )}
    </Container>
  </Menu>
)

export default TopMenu

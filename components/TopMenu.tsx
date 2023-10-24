"use client"

import React from "react"
import { Container, Menu } from "semantic-ui-react"
import LoggedInGreeting from "./LoggedIn"
import { Link } from "react-router-dom"

const TopMenu = ({ activeUser }: { activeUser: any }) => (
  <>
    <Menu className={"navStyle"}>
      <Container>
        {activeUser.user ? (
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
                <LoggedInGreeting activeUser={activeUser} />
              </Menu.Item>
            </Menu.Menu>
          </>
        ) : (
          <>
            <Menu.Item header as={Link} to='/' name='PrintVault' link={true} />
          </>
        )}
      </Container>
    </Menu>
  </>
)

export default TopMenu

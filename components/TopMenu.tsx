"use client"

import React from "react"
import { Container, Menu, Dropdown, Image } from "semantic-ui-react"
import LoggedInGreeting from "./LoggedIn"
import { Link } from "react-router-dom"

export const logo =
  // "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo.jpg"
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/clipped.png?t=2023-10-29T01%3A53%3A11.795Z"

const TopMenu = ({ activeUser }: { activeUser: any }) => (
  <>
    <Menu className={"navStyle"}>
      <Container>
        {activeUser.user ? (
          <>
            <Image
              alt='logo'
              src={logo}
              size='tiny'
              style={{ padding: "10px" }}
            />
            <Menu.Item
              header
              as={Link}
              to='/dashboard/'
              name='PrintVault'
              link={true}
            />
            <Menu.Item as={Link} to='/models/' name='Models' link={true} />
            <Menu.Item as={Link} to='/projects/' name='Projects' link={true} />
            <Menu.Item as={Link} to='/tools/' name='Tools' link={true} />

            <Dropdown item icon='plus' style={{ padding: "0 25px 0px 30px" }}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/models/'>
                  Model
                </Dropdown.Item>
                <Dropdown.Item as={Link} to='/projects/'>
                  Project
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

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

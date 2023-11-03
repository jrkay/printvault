"use client"

import React from "react"
import { Container, Menu, Dropdown, Image } from "semantic-ui-react"
import LoggedInGreeting from "@/components/LoggedIn"
import { Link } from "react-router-dom"
import AddModel from "@/components/model/AddModel"

export const logo =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo_small.png?t=2023-11-02T20%3A48%3A08.072Z"

const dropdownOptions = (userData: any) => [
  {
    key: "model",
    text: "model",
    value: <AddModel page='addModel' userData={userData} />,
  },
]
const TopMenu = ({
  activeUser,
  modelData,
}: {
  activeUser: any
  modelData: any
}) => (
  <>
    <Menu className={"navStyle"}>
      <Container>
        {activeUser.user ? (
          <>
            <Image
              as={Link}
              to='/dashboard/'
              alt='logo'
              src={logo}
              size='tiny'
              style={{ padding: "10px" }}
            />
            <Menu.Item as={Link} to='/models/' name='Models' link={true} />
            <Menu.Item as={Link} to='/projects/' name='Projects' link={true} />
            <Menu.Item as={Link} to='/tools/' name='Tools' link={true} />

            <Menu.Menu position='right'>
              <Dropdown item icon='plus' style={{ padding: "0 25px 0px 30px" }}>
                <Dropdown.Menu style={{}} className={"dropdownItem"}>
                  <Dropdown.Item>
                    <Link
                      to={"/models/add/" + activeUser.user.id}
                      className={"dropdownItem"}
                    >
                      Model
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      to={"/projects/add/" + activeUser.user.id}
                      className={"dropdownItem"}
                    >
                      Project
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>{" "}
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

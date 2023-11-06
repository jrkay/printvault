"use client"

import React from "react"
import { Container, Menu, Dropdown, Image } from "semantic-ui-react"
import Link from "next/link"
import LoggedinDropdown from "@/components/LoggedinDropdown"

export const logo =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo_small.png?t=2023-11-02T20%3A48%3A08.072Z"

const TopMenu = ({ activeUser }: { activeUser: any }) => (
  <>
    <Menu className={"navStyle"}>
      <Container>
        {activeUser ? (
          <>
            <Image
              as={Link}
              href='/dashboard'
              alt='logo'
              src={logo}
              size='tiny'
              style={{ padding: "10px" }}
            />
            <Menu.Item as={Link} href='/models/' name='Models' link={true} />
            <Menu.Item
              as={Link}
              href='/projects/'
              name='Projects'
              link={true}
            />

            <Menu.Menu position='right'>
              <Menu.Item>
                <LoggedinDropdown />
              </Menu.Item>
              <Dropdown
                item
                icon='plus'
                style={{ padding: "0px 30px 0px 35px" }}
              >
                <Dropdown.Menu style={{}} className={"dropdownItem"}>
                  <Dropdown.Item>
                    <Link
                      href={"/models/add" + activeUser.id}
                      className={"dropdownItem"}
                    >
                      Model
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      href={"/projects/add" + activeUser.id}
                      className={"dropdownItem"}
                    >
                      Project
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </>
        ) : (
          <>
            <Menu.Item
              header
              as={Link}
              href='/'
              name='PrintVault'
              link={true}
            />
          </>
        )}
      </Container>
    </Menu>
  </>
)

export default TopMenu

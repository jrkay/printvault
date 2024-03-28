"use client"

import React from "react"
import { Container, Menu, Dropdown, Image, MenuMenu } from "semantic-ui-react"
import Link from "next/link"
import LoggedinDropdown from "@/components/LoggedinDropdown"

export const logo =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo-p.png?t=2024-03-28T00%3A56%3A37.396Z"

const TopMenu = ({ user }: any) => (
  <>
    <Menu>
      <Container>
        <Image
          as={Link}
          href='/'
          alt='logo'
          src={logo}
          size='tiny'
          style={{ padding: "10px" }}
        />
        <Menu.Item
          as={Link}
          href='/models'
          name='Models'
          link={true}
          style={{ fontSize: "1.3em" }}
        />
        <Menu.Item
          as={Link}
          href='/projects'
          name='Projects'
          link={true}
          style={{ fontSize: "1.3em" }}
        />
        {/* Anon / Guest roles hides menu items */}
        {user === "authenticated" ? (
          <>
            <MenuMenu position='right'>
              <LoggedinDropdown />

              <Dropdown
                item
                icon='plus'
                style={{
                  padding: "0px 30px 0px 35px",
                  color: "#6435c9 !important",
                }}
              >
                <Dropdown.Menu
                  style={{ padding: "0" }}
                  className={"dropdownItem"}
                >
                  <div>
                    <Dropdown.Item>
                      <Link
                        href={"/models/add"}
                        className={"dropdownItem"}
                        style={{ fontSize: "1.3em" }}
                      >
                        Model
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        href={"/projects/add"}
                        className={"dropdownItem"}
                        style={{ fontSize: "1.3em" }}
                      >
                        Project
                      </Link>
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </MenuMenu>
          </>
        ) : (
          <>
            <MenuMenu position='right'>
              <Menu.Item
                name='Guest Mode'
                link={false}
                style={{ fontSize: "1.3em" }}
              />
              <Menu.Item
                as={Link}
                href='/dashboard'
                name='Dashboard'
                link={true}
                style={{ fontSize: "1.3em" }}
              />
            </MenuMenu>
          </>
        )}
      </Container>
    </Menu>
  </>
)

export default TopMenu

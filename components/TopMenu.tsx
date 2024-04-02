"use client"

import React from "react"
import { Container, Menu, Dropdown, Image, MenuMenu } from "semantic-ui-react"
import Link from "next/link"
import LoggedinDropdown from "@/components/LoggedinDropdown"

export const logo =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo-p-Photoroom.png-Photoroom.png?t=2024-03-28T03%3A29%3A03.540Z"

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
            <Menu.Item
              as={Link}
              href='/listings'
              name='Listings'
              link={true}
              style={{ fontSize: "1.3em" }}
            />
            <MenuMenu position='right'>
              <LoggedinDropdown />
              <Dropdown
                item
                simple
                icon='plus'
                style={{
                  padding: "0px 30px 0px 35px",
                  color: "#404088",
                }}
              >
                <Dropdown.Menu style={{ padding: "0", marginTop: "2px" }}>
                  <div>
                    <Dropdown.Item>
                      <Link href={"/models/add"} style={{ fontSize: "1.3em" }}>
                        Model
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        href={"/projects/add"}
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

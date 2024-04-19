"use client"

import React from "react"
import { Container, Menu, Dropdown, Image, MenuMenu } from "semantic-ui-react"
import Link from "next/link"
import LoggedinDropdown from "@/components/LoggedinDropdown"
import Searchbar from "@/app/(authorized)/search/Searchbar"
import LogoutButton from "./LogoutButton"

export const logo =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo-p-Photoroom.png-Photoroom.png?t=2024-03-28T03%3A29%3A03.540Z"

const TopMenu = ({ user }: any) => (
  <>
    <Menu stackable>
      <Container>
        <Image
          href='/'
          alt='logo'
          src={logo}
          size='tiny'
          style={{ padding: "10px" }}
        />
        <Menu.Item
          href='/models'
          name='Models'
          link
          style={{ fontSize: "1.3em" }}
        />
        <Menu.Item
          href='/projects'
          name='Projects'
          link
          style={{ fontSize: "1.3em" }}
        />
        <Searchbar />
        {/* Anon / Guest roles hides menu items */}
        {user === "authenticated" ? (
          <>
            <Menu.Item
              href='/listings'
              name='Listings'
              link
              style={{ fontSize: "1.3em" }}
            />
            <Dropdown
              item
              inline
              icon={"user circle big"}
              style={{
                color: "#404088",
                fontSize: "1.3em",
                display: "flex",
              }}
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link href={`/account/`}>Account Details</Link>
                </Dropdown.Item>
                <Dropdown.Item>{LogoutButton()}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <MenuMenu position='right'>
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
            </MenuMenu> */}
          </>
        ) : (
          <>
            <MenuMenu position='right'>
              <Menu.Item name='Guest Mode' style={{ fontSize: "1.3em" }} />
              <Menu.Item
                href='/dashboard'
                name='Dashboard'
                link
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

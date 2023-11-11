"use client"

import React from "react"
import { Container, Menu, Dropdown, Image } from "semantic-ui-react"
import Link from "next/link"
import LoggedinDropdown from "@/components/LoggedinDropdown"

export const logo =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo_small.png?t=2023-11-02T20%3A48%3A08.072Z"

const TopMenu = () => (
  <>
    <Menu className={"navStyle"}>
      <Container>
        <Image
          as={Link}
          href='/dashboard'
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
        <Menu.Item
          as={Link}
          href='/prints'
          name='Prints'
          link={true}
          style={{ fontSize: "1.3em" }}
        />

        <Menu.Menu position='right'>
          <Menu.Item>
            <LoggedinDropdown />
          </Menu.Item>
          <Dropdown item icon='plus' style={{ padding: "0px 30px 0px 35px" }}>
            <Dropdown.Menu
              style={{ padding: "10px" }}
              className={"dropdownItem"}
            >
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
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  </>
)

export default TopMenu

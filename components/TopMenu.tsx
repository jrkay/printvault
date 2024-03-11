"use client"

import React from "react"
import { Container, Menu, Dropdown, Image, Header } from "semantic-ui-react"
import Link from "next/link"
import LoggedinDropdown from "@/components/LoggedinDropdown"

export const logo =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo_small.png?t=2023-11-02T20%3A48%3A08.072Z"

const TopMenu = ({ user }: any) => (
  <>
    <Menu>
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

        {/* Anon / Guest roles hides menu items */}
        {user === "authenticated" ? (
          <>
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
          </>
        ) : (
          <>
            <Menu.Item
              name='Guest Mode'
              link={false}
              style={{ fontSize: "1.3em" }}
            />
            <Menu.Item
              as={Link}
              href='/'
              name='Home'
              link={true}
              style={{ fontSize: "1.3em" }}
            />
          </>
        )}
      </Container>
    </Menu>
  </>
)

export default TopMenu

"use client"

import React from "react"
import { Container, Menu, Dropdown, Image, MenuMenu } from "semantic-ui-react"
import Link from "next/link"
import Searchbar from "@/app/(authorized)/search/Searchbar"
import LogoutButton from "./LogoutButton"
import { logoTiny } from "@/utils/helpers/uiHelpers"

const TopMenu = ({ user }: any) => (
  <>
    <Menu stackable>
      <Container>
        <Image
          href={user === "authenticated" ? "/dashboard" : "/"}
          alt='logo'
          src={logoTiny}
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

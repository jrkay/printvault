'use client'

import Link from 'next/link'
import React from 'react'
import {
  Container,
  Dropdown,
  Menu
} from 'semantic-ui-react'
import LoggedIn from './LoggedIn'

const FixedMenu = (data:any) => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          PrintVault
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>

        <Dropdown item simple text='Dropdown'>
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div>
        {data.data ? (
            <div className='item'>
            <LoggedIn data={data}/>
            </div>
            ) : (
                <Menu.Item as='a' href="/login">Login</Menu.Item>
        )}        
      </div>
    </Container>
    </Menu>
  </div>
)

export default FixedMenu
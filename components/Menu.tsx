'use client'

import React from 'react'
import {
  Container,
  Dropdown,
  Menu
} from 'semantic-ui-react'
import LoggedIn from './LoggedIn'

const FixedMenu = ({ data, userData }: { data: any, userData: any }) => (
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
        {data.user?.id ? (
            <div className='item'>
            <LoggedIn data={data} userData={userData} />
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
'use client'

import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import LoggedIn from './LoggedIn';


const TopMenu = ({ data, userData }: { data: any, userData: any }) => (
  <Menu inverted className={'navStyle'}>
    <Container>
      <Menu.Item as='a' header>PrintVault</Menu.Item>
      <Menu.Item as='a'>Home</Menu.Item>
      {data.user?.id ? (
        <Menu.Item>
          <LoggedIn data={data} userData={userData} />
        </Menu.Item>
      ) : (
        <Menu.Item as='a' href="/login">Login</Menu.Item>
      )}
    </Container>
  </Menu>
);

export default TopMenu;
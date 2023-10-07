'use client'

import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import LoggedIn from './LoggedIn';

const Header = ({ data, userData }: { data: any, userData: any }) => (
  <Menu fixed='top' inverted>
    <Container>
      {/* Header */}
      <Menu.Item as='a' header>
        PrintVault
      </Menu.Item>
      {/* Home */}
      <Menu.Item as='a'>Home</Menu.Item>
      {/* User Actions */}
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

export default Header;
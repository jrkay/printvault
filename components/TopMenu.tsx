'use client'

import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import LoggedIn from './LoggedIn';
import { Link } from 'react-router-dom';

const TopMenu = ({ data, userData }: { data: any, userData: any }) => (
  <Menu inverted className={'navStyle'}>
    <Container>
    <Menu.Item
        header
        as={Link} to="/"
        name='PrintVault'
        link={true}
      />
      {data.user?.id ? (
        <>
          <Menu.Item
            as={Link} to="/files/"
            name='Files'
            link={true}
          />
          <Menu.Item
            as={Link} to="/projects/"
            name='Projects'
            link={true}
          />
          <Menu.Item
            as={Link} to="/tools/"
            name='Tools'
            link={true}
          />
          <Menu.Item
            as={Link} to="/account/"
            name='Account'
            link={true}
          />
          <Menu.Item>
            <LoggedIn userData={userData} />
          </Menu.Item>        
        </>
      ) : (
        <Menu.Item as='a' href="/">Login</Menu.Item>
      )}
    </Container>
  </Menu>
);

export default TopMenu;
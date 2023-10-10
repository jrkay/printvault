import React from 'react';
import { Menu } from 'semantic-ui-react';

const LeftMenu = ({ activeMenuItem, onMenuItemClick }: { activeMenuItem: string, onMenuItemClick: (menuItem: string) => void }) => {
  const handleMenuItemClick = (menuItem: string) => {
    onMenuItemClick(menuItem);
  };

  return (
    console.log("LEFTMENU------ ", activeMenuItem),
    <Menu fluid vertical>
      <Menu.Item
        // as={Link} to="/file/"
        name='Files'
        active={activeMenuItem === 'Files'}
        onClick={() => handleMenuItemClick('Files')}
      />
      <Menu.Item
        // as={Link} to="/project/"
        name='Projects'
        active={activeMenuItem === 'Projects'}
        onClick={() => handleMenuItemClick('Projects')}
      />
      <Menu.Item
        // as={Link} to="/tool/"
        name='Tools'
        active={activeMenuItem === 'Tools'}
        onClick={() => handleMenuItemClick('Tools')}
      />
      <Menu.Item
        // as={Link} to="/account/"
        name='Account'
        active={activeMenuItem === 'Account'}
        onClick={() => handleMenuItemClick('Account')}
        link={true}
      />
    </Menu>
    // Settings
  );
};

export default LeftMenu;
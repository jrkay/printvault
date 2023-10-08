import React from 'react';
import { Menu } from 'semantic-ui-react';


const LeftMenu = ({ activeMenuItem, onMenuItemClick }: { activeMenuItem: string, onMenuItemClick: (menuItem: string) => void }) => {
    const handleMenuItemClick = (menuItem: string) => {
        onMenuItemClick(menuItem);
      };

  return (
    <Menu fluid vertical>
      <Menu.Item
        name='Files'
        active={activeMenuItem === 'Files'}
        onClick={() => handleMenuItemClick('Files')}
      />
      <Menu.Item
        name='Projects'
        active={activeMenuItem === 'Projects'}
        onClick={() => handleMenuItemClick('Projects')}
      />
      <Menu.Item
        name='Tools'
        active={activeMenuItem === 'Tools'}
        onClick={() => handleMenuItemClick('Tools')}
      />
      <Menu.Item
        name='Account'
        active={activeMenuItem === 'Account'}
        onClick={() => handleMenuItemClick('Account')}
      />
    </Menu>
    // Settings
  );
};

export default LeftMenu;
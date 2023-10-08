'use client'

import { Button, Grid } from 'semantic-ui-react'
import React, { useState } from 'react'
import AccountData from '../components/AccountData.tsx'
import ProjectData from './ProjectData.tsx'
import FileData from './FileData.tsx'
import LeftMenu from '../components/LeftMenu.tsx'


const Dashboard = ({ userData, projectData, fileData }: { userData: any, projectData: any, fileData: any }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Files');

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
        <>
      <Grid padded centered>
        <Grid.Row>
          <Grid.Column width={2}>
            <LeftMenu activeMenuItem={activeMenuItem} onMenuItemClick={handleMenuItemClick} />
          </Grid.Column>
          <Grid.Column width={8}>
            {activeMenuItem === 'Files' && <FileData fileData={fileData} />}
            {activeMenuItem === 'Projects' && <ProjectData projectData={projectData} />}
            {activeMenuItem === 'Account' && <AccountData userData={userData} />}
          </Grid.Column>
          <Grid.Column width={1}>
            <Button>FDM</Button><br /><br />
            <Button>Resin</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  </>
  )
}

export default Dashboard;

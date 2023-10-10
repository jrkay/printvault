'use client'

import { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import TopMenu from '../../components/TopMenu';
import LeftMenu from '../../components/LeftMenu';
import FileDetailsExpanded from '../files/FileDetailsExpanded';

export default function FileDetails ({ data, userData, fileData, projectData }: { data:any, userData: any, fileData: any, projectData: any }) {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
    console.log("FILEDETAILS------ ", activeMenuItem),
   <>
   <div className='mainNavDetails' >
      <TopMenu data={data} userData={userData} />
      </div>
      <Grid padded centered>
        <Grid.Row>
          <Grid.Column width={2}>
            <LeftMenu activeMenuItem={activeMenuItem} onMenuItemClick={handleMenuItemClick} />
          </Grid.Column>
          <Grid.Column width={8}>
            <FileDetailsExpanded fileData={fileData} projectData={projectData} />
          </Grid.Column>
          <Grid.Column width={1}>
            <></>
          </Grid.Column>
        </Grid.Row>
      </Grid>
   </>
  )
}

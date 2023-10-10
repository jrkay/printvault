'use client'

import { useState } from 'react'
import { Grid} from 'semantic-ui-react'
import TopMenu from '../../../components/TopMenu';
import LeftMenu from '../LeftMenu';
import ProjectDetailsExpanded from './ProjectDetailsExpanded';

export default function ProjectDetails ({ data, userData, fileData, projectData }: { data:any, userData: any, fileData: any, projectData: any }) {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
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
            <ProjectDetailsExpanded fileData={fileData} projectData={projectData} />
          </Grid.Column>
          <Grid.Column width={1}>
            <></>
          </Grid.Column>
        </Grid.Row>
      </Grid>
   </>
  )
}

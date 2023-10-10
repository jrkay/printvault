'use client'

import { Grid } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import TopMenu from '../../components/TopMenu.tsx'
import DataDisplay from './DataDisplay.tsx'



const NavPage = ({ data, userData, projectData, fileData, page }: { data: any, userData: any, projectData: any, fileData: any, page?: any }) => {
  const [activeNavPage, setActiveNavPage] = useState<React.ReactNode>(null);

  useEffect(() => {
    setActiveNavPage(() => {
      switch (page) {
        case 'Files':
          return <DataDisplay data={data} userData={userData} fileData={fileData} projectData={projectData} page={page} />;
        case 'Projects':
          return <DataDisplay data={data} userData={userData} fileData={fileData} projectData={projectData} page={page} />;
        case 'Account':
          return <DataDisplay data={data} userData={userData} fileData={fileData} projectData={projectData} page={page} />;
        case 'Tools':
          return <DataDisplay data={data} userData={userData} fileData={fileData} projectData={projectData} page={page} />;
        case 'Home':
          return <DataDisplay data={data} userData={userData} fileData={fileData} projectData={projectData} page={page} />;
        default:
      return <></>;
      }
    });
  }, [page]);

  return (
  <>
    <div className='mainNavDetails' >
      <TopMenu data={data} userData={userData} />
    </div>
    <Grid padded centered>
      <Grid.Row>
        <Grid.Column width={1} className='pageContainer'>
        </Grid.Column>
        <Grid.Column width={10} className='pageContainer'>
          {activeNavPage}
        </Grid.Column>
        <Grid.Column width={1}>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </>
  )
}

export default NavPage;

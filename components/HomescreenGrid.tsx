'use client'

import React from 'react';
import Dashboard from './Dashboard.tsx';
import { Grid } from 'semantic-ui-react';


export default function HomeScreenGrid({ data, userData, projectData, fileData }: { data: any, userData: any, projectData: any, fileData: any }) {
  return (
    <>
      <Grid padded style={{ }}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Dashboard data={data} userData={userData} projectData={projectData} fileData={fileData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>   
    </>

  );
}
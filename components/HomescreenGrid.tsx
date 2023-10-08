'use client'

import React from 'react';
import Dashboard from './Dashboard.tsx';
import { Grid } from 'semantic-ui-react';


export default function HomeScreenGrid({ userData, projectData, fileData }: { userData: any, projectData: any, fileData: any }) {
  return (
    <Grid padded style={{ marginTop: '5em !important'}}>
      <Grid.Row>
        <Grid.Column width={16}>
          <></>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Dashboard userData={userData} projectData={projectData} fileData={fileData} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
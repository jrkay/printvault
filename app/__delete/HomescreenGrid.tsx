'use client'

import React from 'react';
import { Grid } from 'semantic-ui-react';
import NavPage from '../nav/NavPage.tsx';


export default function HomeScreenGrid({ data, userData, projectData, fileData }: { data: any, userData: any, projectData: any, fileData: any }) {
  return (
      <Grid padded style={{ }}>
        <Grid.Row>
          <Grid.Column width={16}>
            <NavPage data={data} userData={userData} projectData={projectData} fileData={fileData} page={'Projects'} />
          </Grid.Column>
        </Grid.Row>
      </Grid>   
  );
}
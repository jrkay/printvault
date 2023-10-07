'use client'

import React from 'react';
import Dashboard from './Dashboard.tsx';
import { Grid } from 'semantic-ui-react';

export default function HomeScreenGrid({ userData }: { userData: any }) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <></>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Dashboard userData={userData} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
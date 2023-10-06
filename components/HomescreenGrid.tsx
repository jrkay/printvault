'use client'

import LoggedIn from './LoggedIn.tsx'
import Dashboard from './Dashboard.tsx'
import { Grid } from 'semantic-ui-react'

export const dynamic = 'force-dynamic'


export default function HomescreenGrid (data: any) {
 

  return (
  <Grid>
    <Grid.Row>
      <Grid.Column width={16}>
        <></>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column width={16}>
        <Dashboard data={data} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
  )
}

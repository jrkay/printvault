'use client'

import LoggedIn from '../components/LoggedIn.tsx'
import Dashboard from '../components/Dashboard'
import { Grid } from 'semantic-ui-react'

export const dynamic = 'force-dynamic'


export default function Homescreen (data: any) {
 

  return (
  <Grid>
    <Grid.Row>
      <Grid.Column width={16}>
        <LoggedIn user={data}/>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column width={16}>
        <Dashboard />
      </Grid.Column>
    </Grid.Row>
  </Grid>
  )
}

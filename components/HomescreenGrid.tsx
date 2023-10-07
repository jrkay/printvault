'use client'

import Dashboard from './Dashboard.tsx'
import { Grid } from 'semantic-ui-react'

export const dynamic = 'force-dynamic'

export default function HomescreenGrid ({ data, projectData, userData, printFileData }: { data: any, projectData: any, userData: any, printFileData: any }) {

  return (
    console.log('TABLE-HOMESCREENGRID----------- ', projectData),
    console.log('USER-HOMESCREENGRID----------- ', data),
  <Grid>
    <Grid.Row>
      <Grid.Column width={16}>
        <></>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column width={16}>
        <Dashboard data={data} projectData={projectData} userData={userData} printFileData={printFileData} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
  )
}

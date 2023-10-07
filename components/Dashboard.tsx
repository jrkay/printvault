'use client'

import { Grid } from 'semantic-ui-react'
import React from 'react'
import AccountData from '../components/AccountData.tsx'

export default function Dashboard({ data, projectData, userData, printFileData }: { data: any, projectData: any, userData: any, printFileData: any }) {
  return (
    console.log('TABLE-DASHBOARD----------- ', projectData),
    console.log('USER-DASHBOARD----------- ', data),
  <Grid>
    <Grid.Row>
      <Grid.Column width={4}>
        <AccountData data={data} projectData={projectData} userData={userData} />
      </Grid.Column>
      <Grid.Column width={8}>
          {/* {projects.name} */}
      </Grid.Column>
      <Grid.Column width={4}>
      PrintVault is a top-tier 3D printing file and project management app designed for both enthusiasts and professionals.<br /><br />
      With a clean and intuitive interface, it simplifies organization and quick access to project details. Supporting various 3D file formats, PrintVault adds flexibility to your printing needs. Manage multiple prints effortlessly, set priorities, and receive timely notifications. For a streamlined and efficient 3D printing workflow, PrintVault is your go-to choice.
      </Grid.Column>
    </Grid.Row>
  </Grid>
  )
}

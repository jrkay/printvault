'use client'

import { Grid } from 'semantic-ui-react'
import React from 'react'
import AccountData from './AccountData'

export default function Dashboard(data:any) {
  return (
  <Grid>
    <Grid.Row>
      <Grid.Column width={4}>
        <AccountData data = {data}/>
      </Grid.Column>
      <Grid.Column width={8}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br /><br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Grid.Column>

      <Grid.Column width={4}>
      PrintVault is a top-tier 3D printing file and project management app designed for both enthusiasts and professionals. With a clean and intuitive interface, it simplifies organization and quick access to project details. Supporting various 3D file formats, PrintVault adds flexibility to your printing needs. Manage multiple prints effortlessly, set priorities, and receive timely notifications. For a streamlined and efficient 3D printing workflow, PrintVault is your go-to choice.
      </Grid.Column>
    </Grid.Row>
  </Grid>
  )
}

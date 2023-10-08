'use client'

import { Grid, Header } from 'semantic-ui-react'
import React from 'react'


export default function AccountData ({userData }: { userData: any}) {
  
 const [activeUser] = userData;
  
  return (
    <Grid className='pageContainer'>
      <Grid.Row>
        <Grid.Column width={16}>
          <div>
           <Header as='h3'>Name: </Header>
           {activeUser?.name}
          </div>
          <br />
          <div>
            <Header as='h3'>Email: </Header>
           {activeUser?.email}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

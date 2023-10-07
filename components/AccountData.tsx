'use client'

import { Grid, Button, Form, Checkbox } from 'semantic-ui-react'
import React from 'react'

export default function AccountData ({data, projectData, userData }: { data: any, projectData: any, userData: any}) {
  
 const [activeUser] = userData;
  

  return (
    console.log('USER-ACCOUNTDATA----------- ', activeUser),
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
    <Form>
      <Form.Field>
          <label>Name</label>
          <input
            name="name"
            value={activeUser.name}
            readOnly={true}
            type="text" 
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            name="email"
            value={activeUser.email}
            readOnly={true}
            type="text" 
          />
        </Form.Field>
    </Form>
    </Grid.Column>
    </Grid.Row>
    </Grid>
)
}

'use client'

import { Grid, Button, Form, Checkbox } from 'semantic-ui-react'
import React from 'react'

export default function AccountData ({data, projectData, userData }: { data: any, projectData: any, userData: any}) {

  

  return (
    console.log('USER-ACCOUNTDATA----------- ', userData),
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
    <Form>
      <Form.Field>
          <label>Name</label>
          <input
            name="name"
            value={userData[0]?.name}
            readOnly={true}
            type="text" 
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            name="email"
            value={userData[0]?.email}
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

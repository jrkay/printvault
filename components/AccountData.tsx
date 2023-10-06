'use client'

import { Grid, Button, Form, Checkbox } from 'semantic-ui-react'
import React from 'react'

const AccountData = (data:any) => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={16}>
  <Form>
    <Form.Field>
        <label>Name</label>
         <input
           name="name"
           value={data.data.data.data.email}
           readOnly={true}
           type="text" 
         />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
         <input
           name="email"
           value={data.data.data.data.email}
           readOnly={true}
           type="text" 
         />
      </Form.Field>
  </Form>
  </Grid.Column>
  </Grid.Row>
  </Grid>
)

export default AccountData

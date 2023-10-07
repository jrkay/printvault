'use client'

import { Grid, Form } from 'semantic-ui-react'
import React from 'react'

export default function AccountData ({userData }: { userData: any}) {
  
 const [activeUser] = userData;
  
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                name="name"
                value={activeUser?.name}
                type="text"
                readOnly={true}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                name="email"
                value={activeUser?.email}
                type="text"
                readOnly={true}
              />
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

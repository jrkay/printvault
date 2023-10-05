'use client'

import { Grid, Image } from 'semantic-ui-react'
import React from 'react'

export default function Dashboard() {
  return (
<div> 
<Grid>
    <Grid.Row>
      <Grid.Column width={4} style={{ outline: '1px solid red' }}>
        111111
      </Grid.Column>

      <Grid.Column width={4}>
        2222222
      </Grid.Column>
    </Grid.Row>
  </Grid>
</div>
  )
}

'use client'

import { Grid, Header } from 'semantic-ui-react'
import React from 'react'
import FileTable from './FileTable'


export default function FileData ({ fileData }: { fileData: any }) {
  
  return (
    <Grid className='pageContainer'>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as='h2'>Files</Header>
        </Grid.Column>
      </Grid.Row>
        <FileTable fileData={fileData} />
    </Grid>
  )
}

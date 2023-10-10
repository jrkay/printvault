'use client'

import { Grid, Header } from 'semantic-ui-react'
import React from 'react'
import { Link } from 'react-router-dom'


export default function ProjectData ({ projectData }: { projectData: any }) {
  
  return (
    <Grid className='pageContainer'>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as='h2'>Projects</Header>
        </Grid.Column>
      </Grid.Row>
      {projectData.map((project: any) => (
        <Link to={'/project/' + project.id} key={project.id}>
        <Grid.Row className='fileRow' style={{ }}>
          <Grid.Column width={16}>
            <Header as='h4'>{project.name}</Header>
            <span>{project.description}</span><br />
            <span>{project.user_id}</span>
          </Grid.Column>
        </Grid.Row>
        </Link>
      ))}
    </Grid>
  )
}

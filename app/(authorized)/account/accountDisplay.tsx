"use client"

import { UserData } from "@/utils/AppRoutesProps"
import React from "react"
import { Grid, Header, Segment } from "semantic-ui-react"

const AccountDisplay = ({ activeUser }: { activeUser: any }) => {
  return (
    <>
      <Grid centered className='pageStyle'>
        <Grid.Row>
          <Grid.Column
            largeScreen={13}
            widescreen={13}
            computer={12}
            tablet={12}
            mobile={14}
            className='pageContainer'
            style={{ maxWidth: "1700px" }}
          >
            <Segment style={{ background: "rgb(0, 0, 0, .35)" }} padded='very'>
              <Header as='h2'>Account Details</Header>
              <div>
                <Header as='h4'>Name: </Header>
                {activeUser[0].name}
              </div>
              <br />
              <div>
                <Header as='h4'>Email: </Header>
                {activeUser[0].email}
              </div>
              <br />
              <div>
                <Header as='h4'>Username: </Header>
                {activeUser[0].username}
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default AccountDisplay

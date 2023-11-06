"use client"

import React from "react"
import { Grid, Header, Button, Segment } from "semantic-ui-react"
import Footer from "@/components/Footer"
import TopMenu from "@/components/TopMenu"

const AccountDisplay = ({ activeUser }: { activeUser: any }) => {
  return (
    <>
      <div>
        <TopMenu activeUser={activeUser} />
      </div>
      <div>
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
              <Segment
                style={{ background: "rgb(0, 0, 0, .35)" }}
                padded='very'
              >
                <Header as='h2'>Account Details</Header>
                <div>
                  <Header as='h4'>Name: </Header>
                </div>
                <br />
                <div>
                  <Header as='h4'>Email: </Header>
                  {activeUser?.user.email}
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default AccountDisplay

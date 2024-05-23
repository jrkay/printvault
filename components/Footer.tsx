"use client"

import React from "react"
import { Container, Segment, Image, Header } from "semantic-ui-react"
import { logoSmall } from "@/utils/helpers/uiHelpers"

const Footer = () => (
  <Segment
    vertical
    className={"footerStyle"}
    style={{ margin: "5em 0em 0em", paddingTop: "30px" }}
  >
    <Container textAlign='center'>
      <Image
        alt='logo'
        src={logoSmall}
        size='tiny'
        style={{ margin: "0 auto" }}
      />
      <Header as={"h5"}>PrintVault</Header>
    </Container>
  </Segment>
)

export default Footer

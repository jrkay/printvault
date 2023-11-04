"use client"

import React from "react"
import { Container, Segment, Image, Header } from "semantic-ui-react"

const logo =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo_small.png?t=2023-11-02T20%3A48%3A08.072Z"

const Footer = () => (
  <Segment
    inverted
    vertical
    className={"footerStyle"}
    style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
  >
    <Container textAlign='center'>
      <Image alt='logo' src={logo} size='tiny' style={{ margin: "0 auto" }} />
      <Header as={"h5"}>PrintVault</Header>
    </Container>
  </Segment>
)

export default Footer

"use client"

import React from "react"
import { Container, Segment, Image, Header } from "semantic-ui-react"

const logo =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo-p-small.png?t=2024-03-28T03%3A26%3A43.462Z"

const Footer = () => (
  <Segment
    vertical
    className={"footerStyle"}
    style={{ margin: "5em 0em 0em", paddingTop: "30px" }}
  >
    <Container textAlign='center'>
      <Image alt='logo' src={logo} size='tiny' style={{ margin: "0 auto" }} />
      <Header as={"h5"}>PrintVault</Header>
    </Container>
  </Segment>
)

export default Footer

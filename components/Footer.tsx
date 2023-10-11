"use client";

import React from "react";
import { Container, List, Segment } from "semantic-ui-react";

const Footer = () => (
  <Segment
    inverted
    vertical
    className={"footerStyle"}
    style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
  >
    <Container textAlign="center">
      <List horizontal inverted divided link size="medium">
        <List.Item as="a" href="#">
          Site Map
        </List.Item>
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;

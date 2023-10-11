"use client";

import { Header, Form, Button, Grid } from "semantic-ui-react";

const LoggedOut = () => {
  return (
    <>
      <Grid centered padded style={{ paddingTop: "9em !important" }}>
        <Grid.Row style={{}}>
          <Grid.Column width={4} style={{}}>
            <Grid textAlign="center" style={{}} verticalAlign="middle">
              <Grid.Column
                style={{ maxWidth: 450, color: "#006468 !important" }}
              >
                <Header
                  as="h2"
                  style={{ textAlign: "center", color: "#006468 !important" }}
                >
                  Log In
                </Header>
                <Form action="/auth/sign-in" method="post">
                  <Form.Input
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                  <Form.Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                  />
                  <Button type="submit">Submit</Button>
                </Form>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column
            width={4}
            style={{ textAlign: "center", paddingTop: "20px" }}
          >
            <div>
              PrintVault is a top-tier 3D printing file and project management
              app designed for both enthusiasts and professionals.
              <br />
              <br />
              With a clean and intuitive interface, it simplifies organization
              and quick access to project details. Supporting various 3D file
              formats, PrintVault adds flexibility to your printing needs.
              Manage multiple prints effortlessly, set priorities, and receive
              timely notifications. For a streamlined and efficient 3D printing
              workflow, PrintVault is your go-to choice.
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default LoggedOut;

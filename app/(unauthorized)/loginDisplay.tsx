"use client"

import Link from "next/link"
import OTPLink from "./OTPLoginModal"
import RecoverPassword from "./ForgotPasswordModal"
import { Form, Button, Grid, Segment } from "semantic-ui-react"
import LoginForm from "./LoginForm"

const LoginDisplay = () => {
  const renderTitle = () => <h1>PrintVault</h1>

  const renderDescription = () => (
    <div>
      A focused solution for streamlined 3D printing project management
      <br />
      <span style={{ fontSize: "12px" }}>(currently invitation-only)</span>
    </div>
  )

  return (
    <Grid style={{ minHeight: "100vh" }}>
      <Grid.Column
        width={6}
        style={{
          background:
            "linear-gradient(45deg, hsla(259, 58%, 50%, 1) 1%, hsla(183, 56%, 25%, 1) 95%)",
          padding: "100px",
          color: "white",
        }}
      >
        {renderTitle()}
        {renderDescription()}
      </Grid.Column>
      <Grid.Column width={10} style={{}}>
        <Grid className='login-column'>
          <Grid.Column width={6}>
            <LoginForm />
            <RecoverPassword />
            {/* <OTPLink />  TODO: add back with signup*/}
            <Segment>
              <Link href='/dashboard'>Preview PrintVault</Link>
            </Segment>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  )
}

export default LoginDisplay

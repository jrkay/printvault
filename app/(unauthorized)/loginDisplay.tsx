"use client"

import Link from "next/link"
import OTPLink from "./otpLoginLink"
import RecoverPassword from "./recoverPasswordLink"
import { Form, Button, Grid, Segment } from "semantic-ui-react"

const LoginDisplay = () => {
  const renderLoginForm = () => (
    <Form action='/auth/sign-in' method='post'>
      <Form.Input required name='email' placeholder='you@example.com' />
      <Form.Input
        required
        type='password'
        name='password'
        placeholder='••••••••'
      />
      <Button type='submit' basic color='violet' content='Submit' />
    </Form>
  )

  const renderDescription = () => (
    <div>
      Welcome to PrintVault, the premier solution in 3D printing file and
      project management. <br />
      <br />
      Tailored for enthusiasts and professionals alike, our application features
      a sophisticated yet user-friendly interface, ensuring seamless
      organization and instant access to your project details. With support for
      various 3D file formats, PrintVault elevates your printing capabilities,
      allowing you to manage multiple tasks with ease.
    </div>
  )

  return (
    <Grid centered className='login-grid'>
      <Grid.Row>
        <Grid.Column width={3}>
          <div className='login-logo'></div>
          <Grid className='login-column'>
            <Grid.Column>
              {renderLoginForm()}
              <br />
              <br />
              <RecoverPassword />
              <OTPLink />
              <br />
              <Segment>
                <Link href='/dashboard'>Demo PrintVault as a Guest</Link>
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column width={4} className='description-column'>
          {renderDescription()}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default LoginDisplay

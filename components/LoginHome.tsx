import { Header, Form, Button, Grid } from "semantic-ui-react"

const LoginHome = () => {
  return (
    <Grid centered className='login-grid' style={{ minWidth: "700px" }}>
      {/* Login Form */}
      <Grid.Row>
        <Grid.Column width={3}>
          <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column className='login-column'>
              <Form action='/auth/sign-in' method='post'>
                <Form.Input name='email' placeholder='you@example.com' />
                <Form.Input
                  type='password'
                  name='password'
                  placeholder='••••••••'
                />
                <Button type='submit'>Submit</Button>
              </Form>
              <br />
              <br />
              <a href='/#/recover-password/'>Forgot Password?</a>
            </Grid.Column>
          </Grid>
        </Grid.Column>

        {/* Description */}
        <Grid.Column width={4} className='description-column'>
          <div>
            PrintVault is a top-tier 3D printing file and project management app
            designed for both enthusiasts and professionals.
            <br />
            <br />
            With a clean and intuitive interface, it simplifies organization and
            quick access to project details. Supporting various 3D file formats,
            PrintVault adds flexibility to your printing needs. Manage multiple
            prints effortlessly, set priorities, and receive timely
            notifications. For a streamlined and efficient 3D printing workflow,
            PrintVault is your go-to choice.
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default LoginHome

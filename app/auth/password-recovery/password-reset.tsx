// Screen containing password input, post email validation

import { useState, useCallback } from "react"
import { Form, Button, Grid, Header } from "semantic-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useNavigate } from "react-router-dom"
import LoginHome from "@/components/LoginHome"
import { useParams } from "react-router-dom"

function ResetPassword() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const { token } = useParams<{ token: string }>()

  const supabaseClient = createClientComponentClient()
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const { data, error } = await supabaseClient.auth.updateUser({
      password: password,
    })

    if (data) alert("Password updated successfully!")
    if (error) alert("There was an error updating your password.")

    navigate("/")
    window.location.reload()
  }

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    },
    []
  )

  const isValidUUID = /pkce_[0-9a-f]{56}/i.test(window.location.href)

  return (
    <>
      {isValidUUID ? (
        <Grid centered className='login-grid' style={{ minWidth: "700px" }}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column className='login-column'>
                  <Header as='h4' className='login-header'>
                    Recover Password
                  </Header>
                </Grid.Column>
              </Grid>
            </Grid.Column>

            <Grid.Column width={4} className='description-column'>
              <Form onSubmit={handleSubmit}>
                <label>Change Password:</label>
                <Form.Input
                  id='form-password'
                  name='password'
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div>
                  <Button type='submit'>Submit</Button>
                </div>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <LoginHome />
      )}
    </>
  )
}

export default ResetPassword

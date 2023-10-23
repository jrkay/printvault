// Screen containing password input, post email validation

import { useState, useCallback } from "react"
import { Form, Button, Grid, Header } from "semantic-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useNavigate } from "react-router-dom"

function ResetPassword(userData: any) {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const supabaseClient = createClientComponentClient()
  const navigate = useNavigate()

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault()

  //   try {
  //     await supabaseClient.auth.updateUser({ password: password })
  //     console.log("Submitted:", password)
  //   } catch (error) {
  //     console.error("Error updating user:", error)
  //   }

  //   console.log(
  //     "Submitted Password-Reset: email-- ",
  //     email,
  //     " password-- ",
  //     password
  //   )
  //   // navigate("/")
  //   // window.location.reload()
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const { data, error } = await supabaseClient.auth.updateUser({
      password: password,
    })

    if (data) alert("Password updated successfully!")
    if (error) alert("There was an error updating your password.")

    console.log("data", data)
    console.log("error", error)

    navigate("/")
    window.location.reload()
  }

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    },
    []
  )

  return (
    <>
      <Grid padded centered className='pageStyle'>
        <Grid.Row></Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}>
            <Header as='h4' className='login-header'>
              Recover Password
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
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
    </>
  )
}

export default ResetPassword

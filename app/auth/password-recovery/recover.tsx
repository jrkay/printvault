import { useState, useCallback } from "react"
import { Form, Button, Message, Grid, Header } from "semantic-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useNavigate } from "react-router-dom"

function RecoverPassword(userData: any) {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  function emailIsValid(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!emailIsValid(email)) {
      setErrorMessage("Invalid email")
      return
    }

    setErrorMessage("") // Clear error message if email is valid
    setEmail(email)

    try {
      const supabase = createClientComponentClient()
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#/password-reset`,
      })

      // Redirect to the / route
      navigate("/")

      if (error) {
        // Handle error here
      } else {
        console.log("Submitted:", { email })
      }
    } catch (error) {
      // Handle error here
    }
  }

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
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
              <label>Email:</label>
              <Form.Input
                id='form-email'
                name='email'
                value={email}
                onChange={handleEmailChange}
              />
              {errorMessage && (
                <Message negative>
                  <p>{errorMessage}</p>
                </Message>
              )}
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

export default RecoverPassword

import { useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Form, Button, Message, Grid, Header } from "semantic-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useNavigate } from "react-router-dom"
import { useRouter } from "next/navigation"

function RecoverPassword() {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()

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
        //  redirectTo: `${window.location.origin}/#/password-reset/`,
      })

      // Redirect to the / route
      navigate("/")

      if (error) {
        // Handle error here
      } else {
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

  const BackLink = () => {
    const router = useRouter()
    return (
      <a
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", fontSize: ".95rem", position: "relative" }}
      >
        Back
      </a>
    )
  }

  return (
    <>
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
            <br />
            <br />
            <BackLink />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default RecoverPassword

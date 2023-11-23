"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Form, Button, Message, Grid, Header } from "semantic-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const BackLink = () => {
  const router = useRouter()
  return (
    <a onClick={() => router.replace("/")} className='back-link'>
      Back
    </a>
  )
}

function RecoverPassword() {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  function emailIsValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!emailIsValid(email)) {
      setErrorMessage("Invalid email")
      return
    }

    try {
      const supabase = createClientComponentClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {})

      if (error) {
        setErrorMessage("Error sending recovery email")
      } else {
        setErrorMessage("Email sent successfully. Please check your inbox.")
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred")
    }
  }

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    },
    []
  )

  return (
    <Grid centered className='login-grid' style={{ minWidth: "700px" }}>
      <Grid.Row>
        <Grid.Column width={7} textAlign='center'>
          <Header as='h4' className='login-header'>
            Recover Password
          </Header>
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
              <Button basic color='violet' content='Submit' type='submit' />
            </div>
          </Form>
          <br />
          <br />
          <BackLink />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default RecoverPassword

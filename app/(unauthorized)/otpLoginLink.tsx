import React, { useState, useCallback } from "react"
import { Button, Transition, Container, Form, Message } from "semantic-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const OTPLink = () => {
  const [visible, setVisible] = useState(true)
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
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: "https://printvault.vercel.app",
        },
      })

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

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible)
  }

  return (
    <div>
      <Button
        content={"OTP Login"}
        onClick={toggleVisibility}
        style={{
          marginTop: "10px",
          backgroundColor: "transparent",
          fontFamily: "IBM Plex Sans",
        }}
      />

      <Transition
        visible={!visible}
        animation='slide down'
        duration={200}
        mountOnShow={false}
      >
        <Container
          style={{ border: "1px solid rgba(0, 0, 0, 0.1)", padding: "20px" }}
        >
          <Form onSubmit={handleSubmit}>
            <span style={{ fontSize: "14px" }}>
              Please enter your email to receive a one-time login link.
            </span>
            <Form.Input
              id='otp-email'
              name='email'
              value={email}
              placeholder='you@example.com'
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
        </Container>
      </Transition>
    </div>
  )
}

export default OTPLink

import React, { useState, useCallback } from "react"
import {
  Button,
  Container,
  Form,
  Message,
  Modal,
  Header,
} from "semantic-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const RecoverPassword = () => {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const toggleModal = () => {
    setModalOpen((prevOpen) => !prevOpen)
    setErrorMessage("")
    setSuccessMessage("")
    setEmail("")
  }

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
      setErrorMessage("")
      setSuccessMessage("")
    },
    []
  )

  return (
    <div>
      <Button
        content={"OTP Login"}
        onClick={toggleModal}
        style={{
          marginTop: "10px",
          backgroundColor: "transparent",
          fontFamily: "IBM Plex Sans",
        }}
      />

      <Modal
        open={modalOpen}
        onClose={toggleModal}
        basic
        size='small'
        closeIcon
      >
        <Header icon='lock' content='OTP Login' />
        <Modal.Content>
          <Container style={{ padding: "20px" }}>
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
                <Button color='violet' content='Submit' type='submit' />
              </div>
            </Form>
          </Container>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default RecoverPassword

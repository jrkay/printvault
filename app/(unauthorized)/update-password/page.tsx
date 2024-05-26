"use client"

import { Form, Button, Segment } from "semantic-ui-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const [errors, setErrors] = useState<{ password: string }>({ password: "" })
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [session, setSession] = useState<any>(null)
  const router = useRouter()
  const supabase = createClientComponentClient({})

  useEffect(() => {
    const getSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      setSession(sessionData?.session)
    }
    getSession()
  }, [supabase])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))
    }

    if (name === "password") setNewPassword(value)
  }

  const handlePasswordReset = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      if (!session) {
        throw new Error("User session not found")
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        throw new Error(error.message)
      }
      router.push("/login")
    } catch (error) {
      setLoginError("Password reset failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Segment style={{ width: "50%", margin: "0 auto" }}>
      <span style={{ margin: "0 0 20px", display: "block" }}>
        Reset Password
      </span>
      <Form onSubmit={handlePasswordReset}>
        <Form.Input
          type='password'
          name='password'
          placeholder='Password'
          value={newPassword}
          onChange={handleChange}
          icon='lock'
          iconPosition='left'
          error={
            errors.password
              ? { content: errors.password, pointing: "above" }
              : null
          }
        />
        {loginError && <div className='error-message'>{loginError}</div>}
        <Button
          type='submit'
          color='violet'
          content={isLoading ? "Please wait..." : "Submit"}
          style={{ width: "100%" }}
          disabled={!newPassword || isLoading}
        />
      </Form>
    </Segment>
  )
}

export default UpdatePassword

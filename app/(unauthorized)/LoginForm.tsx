import { Form, Button } from "semantic-ui-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))
    }

    if (name === "email") setEmail(value)
    if (name === "password") setPassword(value)
  }

  const validateForm = () => {
    const newErrors = { email: "", password: "" }

    if (!email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format"

    if (!password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.values(newErrors).every((err) => err === "")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return

    const data = new FormData()
    data.append("email", email)
    data.append("password", password)

    setIsLoading(true)

    try {
      const response = await fetch("/auth/sign-in", {
        method: "POST",
        body: data,
      })

      if (!response.ok) {
        const { error } = await response.json()
        setLoginError(error || "Login failed")
        throw new Error()
      }

      router.push("/dashboard")
    } catch {
      setLoginError("Login failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <>
      <span style={{ margin: "0 0 20px", display: "block" }}>Log In</span>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name='email'
          placeholder='Email Address'
          value={email}
          onChange={handleChange}
          icon='mail'
          iconPosition='left'
          error={
            errors.email ? { content: errors.email, pointing: "above" } : null
          }
        />
        <Form.Input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
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
          disabled={!email || !password || isLoading}
        />
      </Form>
    </>
  )
}

export default LoginForm

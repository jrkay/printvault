import { useState } from "react"
import { Button } from "semantic-ui-react"

export default function LogoutButton() {
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (formRef !== null) {
      formRef.submit()
    }
  }

  return (
    <form
      ref={(ref) => setFormRef(ref)}
      action='/auth/sign-out'
      method='post'
      onSubmit={handleSubmit}
    >
      <Button type='submit'>Log Out</Button>
    </form>
  )
}

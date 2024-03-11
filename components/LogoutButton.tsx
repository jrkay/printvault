import React, { useState } from "react"
import { Button } from "semantic-ui-react"

const LogoutButton = () => {
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (formRef !== null) {
      formRef.submit()
    }
  }

  return (
    <>
      <form
        ref={(ref) => setFormRef(ref)}
        action='/auth/sign-out'
        method='post'
        onSubmit={handleSubmit}
      >
        <Button
          basic
          color='violet'
          content='Log Out'
          type='submit'
          className='logoutButton'
        />
      </form>
    </>
  )
}

export default LogoutButton

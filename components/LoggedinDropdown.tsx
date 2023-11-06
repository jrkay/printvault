import React, { useState } from "react"
import { Dropdown, Button } from "semantic-ui-react"
import Link from "next/link"

const LoggedinDropdown = () => {
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (formRef !== null) {
      formRef.submit()
    }
  }

  return (
    <Dropdown
      inline
      icon='none'
      text='Account'
      style={{
        padding: "0 25px 0px 30px",
        background: "none !important",
        display: "contents",
        color: "rgb(216, 183, 252, 0.6) !important",
        fontSize: "1.3em",
      }}
    >
      <Dropdown.Menu style={{}} className={"dropdownItem"}>
        <Dropdown.Item>
          <Link href='/account' style={{ textAlign: "center" }}>
            Account Details
          </Link>
        </Dropdown.Item>
        <Dropdown.Item style={{ textAlign: "center" }}>
          <form
            ref={(ref) => setFormRef(ref)}
            action='/auth/sign-out'
            method='post'
            onSubmit={handleSubmit}
          >
            <Button type='submit'>Log Out</Button>
          </form>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LoggedinDropdown

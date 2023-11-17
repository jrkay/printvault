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
      text='Account'
      style={{
        fontSize: "1.3em",
        transition: "background .1s ease,box-shadow .1s ease,color .1s ease",
        display: "flex",
      }}
      className='navTextDropdownStyle'
    >
      <Dropdown.Menu className={"dropdownItem"}>
        <Dropdown.Item>
          <Link href={`/account/`}>Account Details</Link>
        </Dropdown.Item>
        <Dropdown.Item>
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
              style={{
                border: "none !important",
                fontSize: "1em",
                boxShadow: "none !important",
                padding: "inherit",
              }}
            />
          </form>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LoggedinDropdown

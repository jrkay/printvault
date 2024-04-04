import React from "react"
import { Dropdown } from "semantic-ui-react"
import Link from "next/link"
import LogoutButton from "./LogoutButton"

const LoggedinDropdown = () => {
  return (
    <Dropdown
      item
      simple
      text='Account'
      style={{
        padding: "0px 30px 0px 35px",
        color: "#404088",
        fontSize: "1.3em",
        display: "flex",
      }}
    >
      <Dropdown.Menu style={{ padding: "0", marginTop: "2px" }}>
        <div>
          <Dropdown.Item>
            <Link href={`/account/`}>Account Details</Link>
          </Dropdown.Item>
          <Dropdown.Item>{LogoutButton()}</Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LoggedinDropdown

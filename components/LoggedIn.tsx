import LogoutButton from "@/components/LogoutButton"
import React from "react"
import { Menu } from "semantic-ui-react"
import { Link } from "react-router-dom"

const LoggedInGreeting = () => {
  const accountLink = (
    <Menu.Item as={Link} to='/account/' name='Account' link={true} />
  )

  return (
    <div style={{ display: "contents" }}>
      {accountLink}
      <LogoutButton />
    </div>
  )
}

export default LoggedInGreeting

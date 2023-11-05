import LogoutButton from "@/components/LogoutButton"
import React from "react"
import { Menu } from "semantic-ui-react"
import Link from "next/link"

const LoggedInGreeting = ({ activeUser }: { activeUser: any }) => {
  const user = activeUser

  const accountLink = (
    //   <Menu.Item as={Link} to='/account/' name='Account' link={true} />
    // <Link href='/account/' as={user} passHref>
    <Link href='/account'>Account</Link>
  )

  return (
    <div style={{ display: "contents" }}>
      {accountLink}
      <LogoutButton />
    </div>
  )
}

export default LoggedInGreeting

import LogoutButton from "../components/LogoutButton"
import React from "react"

const LoggedInGreeting = ({ activeUser }: { activeUser: any }) => {
  return (
    <div style={{ display: "contents" }}>
      <span style={{ paddingRight: "10px" }}>
        {" "}
        Hey, {activeUser.user.email}!{" "}
      </span>
      <LogoutButton />
    </div>
  )
}

export default LoggedInGreeting

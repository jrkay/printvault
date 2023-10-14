import LogoutButton from "../components/LogoutButton"
import React from "react"

const LoggedInComponent = ({ userData }: { userData: any }) => {
  const user = userData[0]

  return (
    <div style={{ display: "contents" }}>
      <span style={{ paddingRight: "10px" }}> Hey, {user?.email}! </span>
      <LogoutButton />
    </div>
  )
}

export default LoggedInComponent

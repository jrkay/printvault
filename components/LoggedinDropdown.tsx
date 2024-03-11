import React, { useState } from "react"
import { Dropdown, Button } from "semantic-ui-react"
import Link from "next/link"
import LogoutButton from "./LogoutButton"

const LoggedinDropdown = () => {
  return (
    <Dropdown
      item
      text='Account'
      style={{
        padding: "0px 30px 0px 35px",
        color: "#6435c9 !important",
        fontSize: "1.3em",
        transition: "background .1s ease,box-shadow .1s ease,color .1s ease",
        display: "flex",
      }}
    >
      <Dropdown.Menu style={{ padding: "0" }} className={"dropdownItem"}>
        <div>
          <Dropdown.Item>
            <Link href={`/account/`}>Account Details</Link>
          </Dropdown.Item>
          <Dropdown.Item>{LogoutButton()}</Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
    // <Dropdown
    //   inline
    //   text='Account'
    //   style={{
    //     fontSize: "1.3em",
    //     transition: "background .1s ease,box-shadow .1s ease,color .1s ease",
    //     display: "flex",
    //   }}
    //   className='navTextDropdownStyle'
    // >
    //   <Dropdown.Menu className={"dropdownItem"}>
    //     <Dropdown.Item>
    //       <form
    //         ref={(ref) => setFormRef(ref)}
    //         action='/auth/sign-out'
    //         method='post'
    //         onSubmit={handleSubmit}
    //       >
    //         <Button
    //           basic
    //           color='violet'
    //           content='Log Out'
    //           type='submit'
    //           style={{
    //             border: "none !important",
    //             fontSize: "1em",
    //             boxShadow: "none !important",
    //             padding: "inherit",
    //           }}
    //         />
    //       </form>
    //     </Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>
  )
}

export default LoggedinDropdown

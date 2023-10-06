'use client'

import LogoutButton from '../components/LogoutButton'

export const dynamic = 'force-dynamic'


export default function LoggedIn(data: any) {

    return (
    <>
      {data ? (
        // Display user information and logout button if user is logged in
        <div style={{ margin: '30px', display: 'flex' }}>
          <span>Hey, {data.email}! &nbsp;&nbsp;</span>
          <LogoutButton />
        </div>
      ) : (
       <></>
      )}
    </>
  )
}

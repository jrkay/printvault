'use client'

import LogoutButton from '../components/LogoutButton'

export const dynamic = 'force-dynamic'


export default function LoggedIn({ data, userData }: { data: any, userData: any }) {

    return (
    <>
        <div style={{ display: 'contents' }}>
          <span>Hey, {data.user?.email}! &nbsp;&nbsp;</span>
          <LogoutButton />
        </div>
    </>
  )
}

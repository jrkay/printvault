import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Database } from './types/supabase.ts'
import FixedMenu from '../components/Menu.tsx'
import Footer from '../components/Footer.tsx'
import Homescreen from '../components/Homescreen.tsx'

export const dynamic = 'force-dynamic'


export default async function Index() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
    <FixedMenu />
    <div style={{ margin: '50px'}}>
    {user ? (
      <Homescreen data={user} />
      ) : (
        // Display login link if user is not logged in
        <Link href="/login">Login</Link>
      )}
      </div>
      <Footer />
    </>
  )
}

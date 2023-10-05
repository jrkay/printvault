import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import Dashboard from '../components/Dashboard'
import { Database } from './types/supabase.ts'

export const dynamic = 'force-dynamic'


export default async function Index() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      <nav>
        <div>
          {user ? (
            <div>
              Hey, {user.email}!
              <LogoutButton />

              <Dashboard />
            </div>
          ) : (
            <Link
              href="/login"
              className=""
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

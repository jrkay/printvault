import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from './types/supabase.ts'
import FixedMenu from '../components/Menu.tsx'
import Footer from '../components/Footer.tsx'
import HomescreenGrid from '../components/HomescreenGrid.tsx'

export const dynamic = 'force-dynamic'


async function Index() {
  let projectData = ServerComponent();

  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const { data: { user } } = await supabase.auth.getUser()


  async function ServerComponent() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
    const { data } = await supabase.from('projects').select()
    return <>{JSON.stringify(data, null, 2)}</>
  }

  return (
    <>
      <FixedMenu data={user}/>
      <div style={{ margin: '50px'}}>
        {user ? (
          <>
          <HomescreenGrid data={user} />
          {projectData}          
          </>
        ) : (
          <>
          <>Please log in.</>         
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Index
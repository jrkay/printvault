import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from './types/supabase.ts'
import Header from '../components/Menu.tsx'
import Footer from '../components/Footer.tsx'
import LoginCheck from './loginCheck.tsx'
import {getPrintFiles, getProjects, getUsers} from './helpers/helpers.tsx'

export const dynamic = 'force-dynamic'

async function Index() {
  const [projectData, printFileData, userData] = await Promise.all([
    getProjects(),
    getPrintFiles(),
    createServerComponentClient<Database>({ cookies: () => cookies() }).auth.getUser().then(response => response.data)
  ]);

  const userDataTable = await getUsers(userData);

  return (
    <>
      <Header data={userData} userData={userDataTable} />
      <LoginCheck data={userData} projectData={projectData} userData={userDataTable} />
      <Footer />
    </>
  )
}

export default Index
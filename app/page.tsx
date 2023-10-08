import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from './types/supabase.ts'
import LoginCheck from './loginCheck.tsx'
import {getPrintFiles, getProjects, getUsers} from './helpers/helpers.tsx'
import '../app/style/index.css';

export const dynamic = 'force-dynamic'


async function Index() {
  const [projectData,  userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() }).auth.getUser().then(response => response.data)
  ]);

  const userDataTable = await getUsers(userData);
  const fileDataTable = await getPrintFiles(userData);

  return (
    <>
      <LoginCheck data={userData} projectData={projectData} userData={userDataTable} fileData={fileDataTable}/>
    </>
  )
}

export default Index
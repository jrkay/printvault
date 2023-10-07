import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from './types/supabase.ts'
import FixedMenu from '../components/Menu.tsx'
import Footer from '../components/Footer.tsx'
import LoginCheck from './loginCheck.tsx'
import {PrintFilesServerComponent, ProjectServerComponent, UsersServerComponent} from './helpers/helpers.tsx'

export const dynamic = 'force-dynamic'

async function Index() {
  const projectData = await ProjectServerComponent();
  const printFileData = await PrintFilesServerComponent();

  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
 
    let data = null;
  try {
    const { data: userData } = await supabase.auth.getUser();
    data = userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  const userDataTable = await UsersServerComponent(data);
  
  return (
    console.log('USER-PAGE----------- ', data),
    console.log('TABLE-PAGE----------- ', projectData),
    <>
      <FixedMenu data={data} userData={userDataTable}/>
      <LoginCheck data={data} projectData={projectData} userData={userDataTable} printFileData={printFileData} />
      <Footer />
    </>
  )
}

export default Index
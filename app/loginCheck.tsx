'use client'

import HomescreenGrid from '../components/HomescreenGrid.tsx'
import TopMenu from '../components/TopMenu.tsx'
import LoggedOut from '@/components/LoggedOut.tsx'


const LoginCheck = ({ data, projectData, userData, fileData }: { data: any, projectData: any, userData: any, fileData: any }) => {

    return (
    <>
      <div style={{}}>
        {data.user ? (
          <>
            <HomescreenGrid data={data} userData={userData} projectData={projectData} fileData={fileData}/>
            {/* <Footer />    */}
          </>
        ) : (
          <>
            <LoggedOut />
          </>
        )}
      </div>
    </>
  )
}

export default LoginCheck
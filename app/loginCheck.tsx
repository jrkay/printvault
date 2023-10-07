import HomescreenGrid from '../components/HomescreenGrid.tsx'


const LoginCheck = ({ data, projectData, userData }: { data: any, projectData: any, userData: any }) => {

    return (
    <>
      <div style={{ margin: '50px'}}>
        {data.user ? (
          <>
          <HomescreenGrid userData={userData} />
          {projectData && JSON.stringify(projectData, null, 2)}         
          </>
        ) : (
          <>Please log in.</>         
        )}
      </div>
    </>
  )
}

export default LoginCheck
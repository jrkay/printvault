import HomescreenGrid from '../components/HomescreenGrid.tsx'


const LoginCheck = ({ data, projectData, userData, printFileData }: { data: any, projectData: any, userData: any, printFileData: any }) => {

    return (
        console.log('USER-LOGINCHECK----------- ', data),
        console.log('TABLE-LOGINCHECK----------- ', projectData),
    <>
      <div style={{ margin: '50px'}}>
        {data ? (
          <>
          <HomescreenGrid data={data} projectData={projectData} userData={userData} printFileData={printFileData} />
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
"use client"

import Login from "@/components/Login.tsx"
import NavPage from "../app/nav/NavPage.tsx"

const LoginCheck = ({
  data,
  projectData,
  userData,
  fileData,
}: {
  data: any
  projectData: any
  userData: any
  fileData: any
}) => {
  return (
    <>
      {data.user ? (
        <>
          <NavPage
            data={data}
            userData={userData}
            projectData={projectData}
            projectFileData={projectData}
            fileData={fileData}
            imageData={fileData}
            page={"Home"}
          />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  )
}

export default LoginCheck

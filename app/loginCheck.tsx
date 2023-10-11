"use client"

import LoggedOut from "@/components/LoggedOut.tsx"
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
            fileData={fileData}
            imageData={fileData}
            page={"Home"}
          />
        </>
      ) : (
        <>
          <LoggedOut />
        </>
      )}
    </>
  )
}

export default LoginCheck

"use client"

import { HashRouter, Route, Routes } from "react-router-dom"
import React, { memo, useMemo } from "react"
import ResetPassword from "./auth/password-recovery/password-reset.tsx"
import RecoverPassword from "./auth/password-recovery/recover.tsx"
import { redirect, useRouter } from "next/navigation"
import { useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"

// Import only the necessary components
import NavPage from "./nav/NavPage.tsx"
import Details from "./details/Details"
import LoginHome from "@/components/LoginHome.tsx"

// Memoize functional components that don't rely on props changes
const MemoizedNavPage = memo(NavPage)
const MemoizedDetails = memo(Details)

export const dynamic = "force-dynamic"

// Split code into smaller components
function AppRoutes({
  data,
  projectData,
  userData,
  fileData,
  jobData,
  imageData,
  projectFileData,
}: {
  data: any
  projectData: any
  userData: any
  fileData: any
  jobData: any
  imageData: any
  projectFileData: any
}) {
  // Memoize
  const navPageProps = useMemo(() => {
    return {
      data,
      projectData,
      projectFileData,
      userData,
      fileData,
      imageData,
    }
  }, [data, projectData, userData, fileData, imageData])

  const detailsProps = useMemo(() => {
    return {
      data,
      projectData,
      userData,
      fileData,
      imageData,
      jobData,
      projectFileData,
    }
  }, [
    data,
    projectData,
    userData,
    fileData,
    imageData,
    jobData,
    projectFileData,
  ])
  //  const router = useRouter()

  // Check if the user is authorized
  // if (!isAuthenticated) {
  //   // Redirect the user to the login page
  //   router.push("/")
  //   //   window.location.reload()
  // }

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<LoginHome />} />
          <Route
            path='/dashboard/'
            element={
              <NavPage
                data={data}
                userData={userData}
                projectData={projectData}
                projectFileData={projectData}
                fileData={fileData}
                imageData={fileData}
                page={"Home"}
              />
            }
          />
          <Route
            path='/recover-password/'
            element={<RecoverPassword userData={userData} />}
          />
          <Route
            path='/password-reset/:token'
            element={<ResetPassword data={data} />}
          />
          <Route
            path='/account/'
            element={<MemoizedNavPage page='Account' {...navPageProps} />}
          />
          <Route
            path='/tools/'
            element={<MemoizedNavPage page='Tools' {...navPageProps} />}
          />
          <Route
            path='/projects/'
            element={<MemoizedNavPage page='Projects' {...navPageProps} />}
          />
          <Route
            path='/files/'
            element={<MemoizedNavPage page='Files' {...navPageProps} />}
          />
          <Route
            path='/files/:id'
            element={<MemoizedDetails page='Files' {...detailsProps} />}
          />
          <Route
            path='/projects/:id'
            element={<MemoizedDetails page='Projects' {...detailsProps} />}
          />
        </Routes>
      </HashRouter>
    </>
  )
}

export default AppRoutes

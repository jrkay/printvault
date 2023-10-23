"use client"

import { HashRouter, Route, Routes } from "react-router-dom"
import React, { memo, useMemo } from "react"
import ResetPassword from "./auth/password-recovery/password-reset.tsx"
import RecoverPassword from "./auth/password-recovery/recover.tsx"

// Import only the necessary components
import LoginCheck from "./loginCheck.tsx"
import NavPage from "./nav/NavPage.tsx"
import Details from "./details/Details"

// Memoize functional components that don't rely on props changes
const MemoizedLoginCheck = memo(LoginCheck)
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
  const loginCheckProps = useMemo(() => {
    return {
      data,
      projectData,
      projectFileData,
      userData,
      fileData,
    }
  }, [data, projectData, userData, fileData])

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

  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path='/'
            element={<MemoizedLoginCheck {...loginCheckProps} />}
          />
          <Route
            path='/recover-password/'
            element={<RecoverPassword userData={userData}/>}
          />
          <Route
            path='/password-reset/'
            element={<ResetPassword userData={userData}/>}
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

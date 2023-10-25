"use client"

import { HashRouter, Route, Routes } from "react-router-dom"
import React, { memo, useMemo } from "react"
import ResetPassword from "./auth/password-recovery/password-reset.tsx"
import RecoverPassword from "./auth/password-recovery/recover.tsx"
import NavPage from "./nav/NavPage.tsx"
import Details from "./details/Details"
import LoginHome from "@/components/LoginHome.tsx"

const MemoizedNavPage = memo(NavPage)
const MemoizedDetails = memo(Details)

function AppRoutes({
  projectData,
  userData,
  fileData,
  jobData,
  imageData,
  projectFileData,
  activeUser,
  modelTags,
}: {
  projectData: any
  userData: any
  fileData: any
  jobData: any
  imageData: any
  projectFileData: any
  activeUser: any
  modelTags: any
}) {
  // Memoize
  const navPageProps = useMemo(() => {
    return {
      projectData,
      projectFileData,
      userData,
      fileData,
      imageData,
      activeUser,
      modelTags,
    }
  }, [projectData, userData, fileData, imageData, activeUser, modelTags])

  const detailsProps = useMemo(() => {
    return {
      projectData,
      userData,
      fileData,
      imageData,
      jobData,
      projectFileData,
      activeUser,
      modelTags,
    }
  }, [
    projectData,
    userData,
    fileData,
    imageData,
    jobData,
    projectFileData,
    activeUser,
    modelTags,
  ])

  return (
    console.log("model tags--------", modelTags),
    (
      <>
        <HashRouter>
          <Routes>
            <Route path='/' element={<LoginHome />} />
            <Route
              path='/dashboard/'
              element={
                <NavPage
                  userData={userData}
                  activeUser={activeUser}
                  projectData={projectData}
                  projectFileData={projectFileData}
                  fileData={fileData}
                  imageData={imageData}
                  page={"Home"}
                  modelTags={modelTags}
                />
              }
            />
            <Route path='/recover-password/' element={<RecoverPassword />} />
            <Route path='/password-reset/:token' element={<ResetPassword />} />
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
  )
}

export default AppRoutes

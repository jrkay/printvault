"use client"

import { HashRouter, Route, Routes } from "react-router-dom"
import React, { memo, useMemo } from "react"
import ResetPassword from "./auth/password-recovery/password-reset.tsx"
import RecoverPassword from "./auth/password-recovery/recover.tsx"
import NavPage from "./nav/NavPage.tsx"
import Details from "./details/Details"
import LoginHome from "@/components/LoginHome.tsx"
import {
  PrinterData,
  ModelData,
  ProjectData,
  UserData,
  ProjectModelData,
  JobData,
  ImageData,
  ModelTags,
} from "./AppRoutesProps.tsx"

const MemoizedNavPage = memo(NavPage)
const MemoizedDetails = memo(Details)

function AppRoutes({
  projectData,
  userData,
  modelData,
  jobData,
  imageData,
  projectModelData,
  activeUser,
  modelTags,
  printerData,
}: {
  projectData: any
  userData: UserData[]
  modelData: ModelData[]
  jobData: JobData[]
  imageData: any // ImageData[]
  projectModelData: ProjectModelData[]
  activeUser: any
  modelTags: ModelTags[]
  printerData: PrinterData[]
}) {
  // Memoize
  const navPageProps = useMemo(() => {
    return {
      projectData,
      projectModelData,
      userData,
      modelData,
      imageData,
      activeUser,
      modelTags,
      printerData,
    }
  }, [
    projectData,
    userData,
    modelData,
    imageData,
    activeUser,
    modelTags,
    printerData,
  ])

  const detailsProps = useMemo(() => {
    return {
      projectData,
      userData,
      modelData,
      imageData,
      jobData,
      projectModelData,
      activeUser,
      modelTags,
      printerData,
    }
  }, [
    projectData,
    userData,
    modelData,
    imageData,
    jobData,
    projectModelData,
    activeUser,
    modelTags,
    printerData,
  ])

  return (
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
                projectModelData={projectModelData}
                modelData={modelData}
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
            path='/models/'
            element={<MemoizedNavPage page='Models' {...navPageProps} />}
          />
          <Route
            path='/models/:id'
            element={<MemoizedDetails page='Models' {...detailsProps} />}
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

"use client"

import { HashRouter, Route, Routes } from "react-router-dom"
import React, { memo, useMemo } from "react"
import ResetPassword from "@/app/auth/password-recovery/password-reset.tsx"
import RecoverPassword from "@/app/auth/password-recovery/recover.tsx"
import NavPage from "@/components/nav/NavPage.tsx"
import Details from "@/components/model/Details"
import LoginHome from "@/components/LoginHome"
import {
  PrinterData,
  ModelData,
  ProjectData,
  UserData,
  ProjectModelData,
  JobData,
  ImageData,
  ModelTags,
} from "@/utils/AppRoutesProps.tsx"
import AddModel from "@/components/model/AddModel"

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
  fileData,
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
  fileData: any
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
      fileData,
    }
  }, [
    projectData,
    userData,
    modelData,
    imageData,
    activeUser,
    modelTags,
    printerData,
    fileData,
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
      fileData,
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
    fileData,
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
                fileData={fileData}
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
            path='/models/add/:user_id'
            element={<MemoizedNavPage page='ModelAdd' {...navPageProps} />}
          />
          <Route
            path='/projects/add/:user_id'
            element={<MemoizedNavPage page='ProjectAdd' {...navPageProps} />}
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

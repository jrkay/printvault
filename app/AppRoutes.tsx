"use client"

import LoginCheck from "./loginCheck.tsx"
import "../app/style/index.css"
import { HashRouter, Route, Routes } from "react-router-dom"
import Details from "./details/Details.tsx"
import NavPage from "./nav/NavPage.tsx"

export const dynamic = "force-dynamic"

function AppRoutes({
  data,
  projectData,
  userData,
  fileData,
  jobData,
  imageData,
}: {
  data: any
  projectData: any
  userData: any
  fileData: any
  jobData: any
  imageData: any
}) {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path='/'
            element={
              <LoginCheck
                data={data}
                projectData={projectData}
                userData={userData}
                fileData={fileData}
              />
            }
          />
          <Route
            path='/account/'
            element={
              <NavPage
                page='Account'
                data={data}
                userData={userData}
                fileData={fileData}
                projectData={projectData}
                imageData={imageData}
              />
            }
          />
          <Route
            path='/tools/'
            element={
              <NavPage
                page='Tools'
                data={data}
                userData={userData}
                fileData={fileData}
                projectData={projectData}
                imageData={imageData}
              />
            }
          />
          <Route
            path='/projects/'
            element={
              <NavPage
                page='Projects'
                data={data}
                userData={userData}
                fileData={fileData}
                projectData={projectData}
                imageData={imageData}
              />
            }
          />
          <Route
            path='/files/'
            element={
              <NavPage
                page='Files'
                data={data}
                userData={userData}
                fileData={fileData}
                projectData={projectData}
                imageData={imageData}
              />
            }
          />

          <Route
            path='/files/:id'
            element={
              <Details
                page='Files'
                data={data}
                userData={userData}
                fileData={fileData}
                projectData={projectData}
                imageData={imageData}
                jobData={jobData}
              />
            }
          />
          <Route
            path='/projects/:id'
            element={
              <Details
                page='Projects'
                data={data}
                userData={userData}
                fileData={fileData}
                projectData={projectData}
                imageData={imageData}
                jobData={jobData}
              />
            }
          />
        </Routes>
      </HashRouter>
    </>
  )
}

export default AppRoutes

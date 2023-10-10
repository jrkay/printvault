'use client'

import LoginCheck from './loginCheck.tsx'
import '../app/style/index.css';
import { HashRouter, Route, Routes } from 'react-router-dom'
import FileDetails from './files/FileDetails.tsx';
import ProjectDetails from './projects/ProjectDetails.tsx';

export const dynamic = 'force-dynamic'


function AppRoutes({ data, projectData, userData, fileData }: { data: any, projectData: any, userData: any, fileData: any }) {

  return (
    <>
    <HashRouter>
        <Routes>
        <Route path="/" element={<LoginCheck data={data} projectData={projectData} userData={userData} fileData={fileData}/>} />
        {/* <Route path="account" element={<LoginCheck data={data} projectData={projectData} userData={userData} fileData={fileData}/>} /> */}
        <Route path="file/:id" element={<FileDetails data={data} userData={userData} fileData={fileData} projectData={projectData} />} />
        <Route path="project/:id" element={<ProjectDetails data={data} userData={userData} fileData={fileData} projectData={projectData} />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default AppRoutes

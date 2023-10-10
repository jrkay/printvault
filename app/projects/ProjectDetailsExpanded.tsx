'use client'

import { BackLink, ProjectDetailFields } from '../helpers/detailHelpers';

export default function ProjectDetailsExpanded ({ projectData, fileData }: { projectData: any, fileData: any }) {

  return (
  <>
    <div className='pageContainer'>
        <BackLink />
        <ProjectDetailFields projectData={projectData} fileData={fileData} />     
    </div>
  </>
  )
}

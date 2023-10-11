'use client'

import { useEffect, useState } from 'react'
import { FileDetailFields, ProjectDetailFields, ToolsDetailFields, AccountDetailFields } from '../helpers/detailHelpers';  

function DetailsExpanded ({ data, userData, fileData, projectData, page, isEdit }: { data: any, userData: any, fileData: any, projectData: any, page?: any, isEdit?: any }) {
  const [activeObjectPage, setActiveObjectPage] = useState<React.ReactNode>(null);

  useEffect(() => {
    setActiveObjectPage(() => {
      switch (page) {
        case 'Files':
          return <FileDetailFields fileData={fileData} projectData={projectData} isEdit={isEdit} />;
        case 'Projects':
          return <ProjectDetailFields fileData={fileData} projectData={projectData} isEdit={isEdit} />;
        case 'Tools':
          return <ToolsDetailFields fileData={fileData} projectData={projectData} isEdit={isEdit} />;
        case 'Account':
          return <AccountDetailFields fileData={fileData} projectData={projectData} isEdit={isEdit} />;
        default:
          return <></>;
      }
    });
  }, [page, isEdit]);


  return (
    <>
    <div className='mainNavDetails' >
      {activeObjectPage}
    </div>
   </>
  )
};

export default DetailsExpanded
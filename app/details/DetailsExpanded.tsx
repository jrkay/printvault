'use client'

import { useEffect, useState } from 'react'
import { FileDetailFields, ProjectDetailFields, ToolsDetailFields, AccountDetailFields } from '../helpers/detailHelpers';  

function DetailsExpanded ({ data, userData, fileData, projectData, page}: { data: any, userData: any, fileData: any, projectData: any, page?: any }) {
  const [activeObjectPage, setActiveObjectPage] = useState<React.ReactNode>(null);

  useEffect(() => {
    setActiveObjectPage(() => {
      switch (page) {
        case 'Files':
          return <FileDetailFields fileData={fileData} projectData={projectData} />;
        case 'Projects':
          return <ProjectDetailFields fileData={fileData} projectData={projectData} />;
        case 'Tools':
          return <ToolsDetailFields fileData={fileData} projectData={projectData} />;
        case 'Account':
          return <AccountDetailFields fileData={fileData} projectData={projectData} />;
        default:
          return <></>;
      }
    });
  }, [page]);


  return (
    <>
    <div className='mainNavDetails' >
      {activeObjectPage}
    </div>
   </>
  )
};

export default DetailsExpanded
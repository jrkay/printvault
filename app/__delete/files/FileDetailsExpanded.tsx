'use client'

import { BackLink, FileDetailFields } from '../../helpers/detailHelpers';

export default function FileDetailsExpanded ({ fileData, projectData }: { fileData: any, projectData: any }) {
 return (
  <>
    <div className='pageContainer'>
      <BackLink />
      <FileDetailFields projectData={projectData} fileData={fileData} /> 
    </div>
  </>
  )
}




// export default function FileDetailsExpanded ({ fileData }: { fileData: any }) {
//   const { id } = useParams<{ id: string }>();
//   const activeFile = fileData.find((file: any) => file.id === id);
//   const [activeMenuItem, setActiveMenuItem] = useState('Files');

//   const handleMenuItemClick = (menuItem: string) => {
//     setActiveMenuItem(menuItem);
//   };

//   return (
//   <>
//     <div className='pageContainer'>
//       <Link to={'/'}>Back</Link>
//       <Header as='h2'>File Details</Header>
      
//       {activeFile.name}
      
//     </div>
//   </>
//   )
// }
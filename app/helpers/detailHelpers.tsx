import {Link, useParams } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

export const BackLink = () => (
    <Link to={'/'}>Back</Link>
  );


 export const FileDetailFields = ({ fileData, projectData }: { fileData: any, projectData: any }) => {
    const { id } = useParams<{ id: string }>();
    const activeFile = fileData.find((file: any) => file.id === id);

    return (
        <>
            <Header as='h2'>File Details</Header>
            <span>File Name</span><br />
            {activeFile.name}<br />
            <span>File Description</span><br />
            {activeFile.description}
        </>
    );
}


export const ProjectDetailFields = ({ fileData, projectData }: { fileData: any, projectData: any }) => {
    const { id } = useParams<{ id: string }>();
    const activeProject = projectData.find((file: any) => file.id === id);

    return (
        <>
            <Header as='h2'>Project Details</Header>
            <span>Project Name</span><br />
            {activeProject.name}<br />
            <span>Project Description</span><br />
            {activeProject.description}
        </>
    );
}
  
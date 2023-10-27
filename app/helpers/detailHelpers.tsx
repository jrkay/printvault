import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Item, Button, Grid, Header, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { EditFile } from "../../components/file/EditFile.tsx"
import AddFile from "../../components/file/AddFile.tsx"
import AddProject from "../../components/project/AddProject.tsx"
import { EditProject } from "../../components/project/EditProject.tsx"

export const FileDetailFields = ({
  modelData,
  jobData,
  imageData,
  userData,
  isEdit,
  isAdd,
  modelTags,
}: {
  modelData: any
  jobData: any
  imageData: any
  userData: any
  isEdit?: any
  isAdd?: any
  modelTags: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeFile = modelData && modelData.find((file: any) => file.id === id)
  let activeImage = null

  if (imageData) {
    activeImage = imageData.find(
      (image: any) => image.model_id === activeFile?.id
    )
  }

  if (isEdit) {
    return <EditFile modelData={modelData} modelTags={modelTags} />
  }
  if (isAdd) {
    return <AddFile userData={userData} />
  }

  const filteredJobData = jobData.filter(
    (job: any) => job.model_id === activeFile.id
  )

  const filteredModelTags = () => {
    const tagList = modelTags.filter(
      (tag: any) => tag.model_id === activeFile.id
    )

    if (tagList.length === 0) {
      return <>No Tags</>
    } else {
      return tagList.map((tag: any) => {
        return (
          <span
            key={tag.id}
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "2px 5px",
              borderRadius: "5px",
              background: "rgba(255, 255, 255, 0.1)",
              margin: "0 3px",
              fontSize: "14px",
            }}
          >
            {tag.tags.name}
          </span>
        )
      })
    }
  }

  return (
    <>
      {activeFile ? (
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image alt='' src={activeImage?.href ? activeImage.href : ""} />
            </Grid.Column>
            <Grid.Column width={8}>
              <div>
                <Header as='h3'>{activeFile.name}</Header>
                <Button disabled style={{ margin: "20px 0" }}>
                  Download
                </Button>
                <div>
                  <Header as='h5'>Tags</Header>
                  {filteredModelTags()}
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={1}>
              <></>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <div style={{ marginBottom: "20px" }}>{activeFile.description}</div>
          </Grid.Row>
          <Grid.Row>
            <div
              style={{
                backgroundColor: "rgb(255,255,255,.05)",
                padding: "20px",
                fontSize: "14px",
                width: "100%",
              }}
            >
              <Header as='h4'>Print Jobs</Header>
              <Item.Group divided>
                {filteredJobData.length > 0 ? (
                  <>
                    {jobData
                      .filter((job: any) => job.model_id === activeFile.id)
                      .map((job: any) => (
                        <Item key={job.id}>
                          <Item.Content>
                            {/* <Item.Header>{job.created_at}</Item.Header> */}
                            <Item.Description>
                              Ran on {job.created_at}
                              <br />
                              {job.duration} min on {job.printer}
                              <br />
                              Notes: {job.comments}
                            </Item.Description>
                            <Item.Extra>Status: {job.status}</Item.Extra>
                          </Item.Content>
                        </Item>
                      ))}
                  </>
                ) : (
                  <span>No print jobs found.</span>
                )}
              </Item.Group>{" "}
            </div>
          </Grid.Row>
        </Grid>
      ) : (
        <></>
      )}
    </>
  )
}

export const ProjectDetailFields = ({
  modelData,
  projectData,
  projectFileData,
  userData,
  isEdit,
  isAdd,
}: {
  modelData: any
  projectData: any
  projectFileData: any
  userData: any
  isEdit?: any
  isAdd?: any
}) => {
  const [projectFilesIds, setProjectFilesIds] = useState<string[]>([])
  const [projectFiles, setProjectFiles] = useState<string[]>([])

  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((file: any) => file.id === id)

  useEffect(() => {
    getFileIds()
  }, [])

  if (isEdit) {
    return (
      <EditProject
        projectData={projectData}
        modelData={modelData}
        projectFileData={projectFileData}
      />
    )
  }
  if (isAdd) {
    return <AddProject userData={userData} modelData={modelData} />
  }

  const getFileIds = () => {
    if (projectFileData) {
      const matchingProjectFiles = projectFileData.filter(
        (row: any) => row.project_id === activeProject?.id
      )
      const fileIds = matchingProjectFiles.map((row: any) => row.model_id)

      const mappedFileIds = fileIds.map((id: any) => ({ id }))
      setProjectFilesIds(mappedFileIds)

      const matchingFiles = modelData.filter((row: any) =>
        mappedFileIds.some((fileId: any) => fileId.id === row.id)
      )
      setProjectFiles(matchingFiles)
    }
  }

  return (
    <>
      {activeProject ? (
        <>
          <Grid padded>
            <Grid.Row>
              <Grid.Column width={16}>
                <div>
                  <Header as='h3'>{activeProject.name}</Header>
                  <div>
                    Files:
                    <br />
                    {projectFileData.length ? (
                      <>
                        {projectFiles.map((file: any) => (
                          <div key={file.id} style={{ marginTop: "10px" }}>
                            <Link to={"/files/" + file.id}>{file.name}</Link>
                          </div>
                        ))}
                      </>
                    ) : (
                      "None"
                    )}
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={1}>
                <></>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <div>
                Description: <br />
                {activeProject.description}
              </div>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export const ToolsDetailFields = ({
  modelData,
  projectData,
  isEdit,
}: {
  modelData: any
  projectData: any
  isEdit?: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((file: any) => file.id === id)

  return (
    <>
      <Header as='h2'>Tools Details</Header>
      <span>Tools Name</span>
      <br />
      {activeProject.name}
      <br />
      <span>Tools Description</span>
      <br />
      {activeProject.description}
    </>
  )
}

export const AccountDetailFields = ({
  modelData,
  projectData,
  isEdit,
}: {
  modelData: any
  projectData: any
  isEdit?: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((file: any) => file.id === id)

  return (
    <>
      <Header as='h2'>Account Details</Header>
      <span>Account Name</span>
      <br />
      {activeProject.name}
      <br />
      <span>Account Description</span>
      <br />
      {activeProject.description}
    </>
  )
}

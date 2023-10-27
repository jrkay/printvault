import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Item, Button, Grid, Header, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { EditModel } from "../../components/model/EditModel.tsx"
import AddModel from "../../components/model/AddModel.tsx"
import AddProject from "../../components/project/AddProject.tsx"
import { EditProject } from "../../components/project/EditProject.tsx"

export const ModelDetailFields = ({
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
  const activeModel =
    modelData && modelData.find((model: any) => model.id === id)
  let activeImage = null

  if (imageData) {
    activeImage = imageData.find(
      (image: any) => image.model_id === activeModel?.id
    )
  }

  if (isEdit) {
    return <EditModel modelData={modelData} modelTags={modelTags} />
  }
  if (isAdd) {
    return <AddModel userData={userData} />
  }

  const filteredJobData = jobData.filter(
    (job: any) => job.model_id === activeModel.id
  )

  const filteredModelTags = () => {
    const tagList = modelTags.filter(
      (tag: any) => tag.model_id === activeModel.id
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
      {activeModel ? (
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image alt='' src={activeImage?.href ? activeImage.href : ""} />
            </Grid.Column>
            <Grid.Column width={8}>
              <div>
                <Header as='h3'>{activeModel.name}</Header>
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
            <div style={{ marginBottom: "20px" }}>
              {activeModel.description}
            </div>
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
                      .filter((job: any) => job.model_id === activeModel.id)
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
  projectModelData,
  userData,
  isEdit,
  isAdd,
}: {
  modelData: any
  projectData: any
  projectModelData: any
  userData: any
  isEdit?: any
  isAdd?: any
}) => {
  const [projectModelsIds, setProjectModelsIds] = useState<string[]>([])
  const [projectModels, setProjectModels] = useState<string[]>([])

  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((model: any) => model.id === id)

  useEffect(() => {
    getModelIds()
  }, [])

  if (isEdit) {
    return (
      <EditProject
        projectData={projectData}
        modelData={modelData}
        projectModelData={projectModelData}
      />
    )
  }
  if (isAdd) {
    return <AddProject userData={userData} modelData={modelData} />
  }

  const getModelIds = () => {
    if (projectModelData) {
      const matchingProjectModels = projectModelData.filter(
        (row: any) => row.project_id === activeProject?.id
      )
      const modelIds = matchingProjectModels.map((row: any) => row.model_id)

      const mappedModelIds = modelIds.map((id: any) => ({ id }))
      setProjectModelsIds(mappedModelIds)

      const matchingModels = modelData.filter((row: any) =>
        mappedModelIds.some((modelId: any) => modelId.id === row.id)
      )
      setProjectModels(matchingModels)
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
                    Models:
                    <br />
                    {projectModelData.length ? (
                      <>
                        {projectModels.map((model: any) => (
                          <div key={model.id} style={{ marginTop: "10px" }}>
                            <Link to={"/models/" + model.id}>{model.name}</Link>
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
  const activeProject = projectData.find((model: any) => model.id === id)

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
  const activeProject = projectData.find((model: any) => model.id === id)

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

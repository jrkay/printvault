import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Item, Button, Grid, Header, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { EditModel } from "../../components/model/EditModel.tsx"
import AddModel from "../../components/model/AddModel.tsx"
import AddProject from "../../components/project/AddProject.tsx"
import { EditProject } from "../../components/project/EditProject.tsx"
import ImageGallery from "react-image-gallery"
import {
  JobData,
  ModelData,
  ProjectData,
  UserData,
  ProjectModelData,
} from "../AppRoutesProps.tsx"

export const ModelDetailFields = ({
  modelData,
  jobData,
  imageData,
  userData,
  isEdit,
  isAdd,
  modelTags,
}: {
  modelData: ModelData[]
  jobData: JobData[]
  imageData: any //ImageData[]
  userData: UserData[]
  isEdit?: any
  isAdd?: any
  modelTags: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeModel =
    modelData && modelData.find((model: any) => model.id === id)
  let activeImages = null

  if (imageData) {
    activeImages = imageData.filter(
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
    (job: any) => job.model_id === activeModel?.id
  )

  const filteredModelTags = () => {
    const tagList = modelTags.filter(
      (tag: any) => tag.model_id === activeModel?.id
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

  const imageArray = activeImages.map((image: any) => {
    return {
      original: image.href,
      alt: image.id,
      thumbnail: image.href,
    }
  })

  return (
    <>
      {activeModel ? (
        <Grid>
          <Grid.Row centered>
            <Grid.Column
              largeScreen={8}
              widescreen={8}
              computer={8}
              tablet={15}
              mobile={15}
            >
              {activeImages.length > 0 ? (
                <ImageGallery
                  items={imageArray}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showNav={true}
                  showThumbnails={true}
                />
              ) : (
                <div
                  style={{
                    padding: "70px",
                    background: "rgb(255,255,255,.05)",
                    textAlign: "center",
                  }}
                >
                  No Image
                </div>
              )}
            </Grid.Column>
            <Grid.Column
              largeScreen={8}
              widescreen={8}
              computer={8}
              tablet={16}
              mobile={16}
            >
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
              <div style={{ margin: "20px 0" }}>{activeModel.description}</div>
            </Grid.Column>
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
  modelData: ModelData[]
  projectData: any
  projectModelData: any //ProjectModelData[]
  userData: UserData[]
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

      const matchingModels = modelData
        .filter((row: any) =>
          mappedModelIds.some((modelId: any) => modelId.id === row.id)
        )
        .map((model: any) => model.id)
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
  modelData: ModelData[]
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
  modelData: ModelData[]
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

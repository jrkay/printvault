import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Grid, Header } from "semantic-ui-react"
import EditModel from "@/components/model/EditModel"
import AddModel from "@/components/model/AddModel"
import AddProject from "@/components/project/AddProject"
import EditProject from "@/components/project/EditProject"
import ImageGallery from "react-image-gallery"
import { ModelData, UserData } from "@/utils/AppRoutesProps.tsx"

export const ModelDetailFields = ({
  modelData,
  imageData,
  userData,
  isEdit,
  isAdd,
  modelTags,
  fileData,
}: {
  modelData: ModelData[]
  imageData: any //ImageData[]
  userData: UserData[]
  isEdit?: any
  isAdd?: any
  modelTags: any
  fileData: any
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
    return (
      <EditModel
        modelData={modelData}
        modelTags={modelTags}
        imageData={imageData}
        fileData={fileData}
        userData={userData}
      />
    )
  }
  if (isAdd) {
    return <AddModel page='ModelAdd' userData={userData} />
  }

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

  const downloadFile = () => {
    const modelFiles = fileData
      .filter((file: any) => file.model_id === activeModel?.id)
      .map((file: any, index: number) => {
        const extension = file.href.match(/\.(\w{3})(?=\?|$)/)?.[1]
        return (
          <div key={index}>
            <a href={file.href} download>
              {activeModel?.name} - {extension}
            </a>
            <br />
          </div>
        )
      })

    if (modelFiles.length === 0) {
      return "No files"
    }

    return modelFiles
  }

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

                <Header as='h5'>Files</Header>
                {downloadFile()}

                <Header as='h5'>Tags</Header>
                {filteredModelTags()}
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

  const findMatchingIds = (projectModels: string): string[] => {
    const matchingIds = modelData
      .filter((row: any) => projectModels.includes(row.id))
      .map((model: any) => model.name)

    return matchingIds
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
                    {projectModels.length ? (
                      <>
                        {projectModels.map((model: string, index: number) => (
                          <div key={index} style={{ marginTop: "10px" }}>
                            <Link href={"/models/" + model}>
                              {findMatchingIds(model)}
                            </Link>
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

export const ToolsDetailFields = ({ projectData }: { projectData: any }) => {
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

export const AccountDetailFields = ({ projectData }: { projectData: any }) => {
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

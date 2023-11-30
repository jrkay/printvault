import { useParams } from "next/navigation"
import Link from "next/link"
import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react"
import EditModel from "@/components/model/EditModel"
import EditProject from "@/components/project/EditProject"
import ImageGallery from "react-image-gallery"
import {
  FileData,
  ModelData,
  ModelTags,
  ProjectData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"

export const ModelDetailFields = ({
  modelData,
  imageData,
  activeUser,
  isEdit,
  modelTags,
  fileData,
  userData,
}: {
  modelData: ModelData[]
  imageData: any
  activeUser: UserData[]
  isEdit?: boolean
  modelTags: ModelTags[]
  fileData: FileData[]
  userData: UserData[]
}) => {
  const { id } = useParams<{ id: string }>()

  // Find the active model using the 'id' parameter
  const activeModel = modelData?.find((model) => model.id === id)

  // Filter images related to the active model
  const activeImages =
    imageData?.filter((image: any) => image.model_id === activeModel?.id) || []

  if (isEdit) {
    return (
      <EditModel
        modelData={modelData}
        modelTags={modelTags}
        imageData={imageData}
        fileData={fileData}
        activeUser={activeUser}
      />
    )
  }

  // Render model tags as spans with styling
  const renderModelTags = () => {
    const tagList = modelTags.filter((tag) => tag.model_id === activeModel?.id)

    if (tagList.length === 0) {
      return <span>No Tags</span>
    } else {
      return tagList.map((tag) => (
        <span
          key={tag.id}
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            padding: "2px 5px",
            borderRadius: "5px",
            margin: "0 3px",
            fontSize: "14px",
          }}
          className='bg-255-1'
        >
          {tag.model_id}
        </span>
      ))
    }
  }

  // Map images to format suitable for ImageGallery component
  const imageArray = activeImages.map((image: any) => ({
    original: image.href,
    alt: image.id,
    thumbnail: image.href,
  }))

  // Generate download links for associated files
  const renderDownloadFiles = () => {
    const modelFiles = fileData
      .filter((file) => file.model_id === activeModel?.id)
      .map((file, index) => {
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

    return modelFiles.length === 0 ? "No files" : modelFiles
  }

  // Format date as a string
  const formattedDate = (date: any) =>
    new Date(date).toLocaleDateString(undefined)

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
                    background: "rgb(0,0,0,.05)",
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
                <p style={{ margin: "0", fontSize: ".8em" }}>
                  <Icon name='cloud upload' />
                  Uploaded on{" "}
                  <span style={{ fontWeight: "500" }}>
                    {formattedDate(activeModel.created_at)} by{" "}
                    {userData
                      .filter((user) => user.id === activeModel.user_id)
                      .map((user) => (
                        <span key={user.id} style={{ marginLeft: "3px" }}>
                          <Link href={`/account/${user.username}`}>
                            {user.username}
                          </Link>
                        </span>
                      ))}
                  </span>
                  <br />
                  {activeModel.last_updated && (
                    <>
                      <Icon name='edit' />
                      Last Updated on{" "}
                      <span style={{ fontWeight: "500" }}>
                        {formattedDate(activeModel.last_updated)}
                      </span>
                    </>
                  )}
                  <br />
                  <br />
                  {activeModel.url && typeof activeModel.url === "string" ? (
                    <Button
                      basic
                      color='violet'
                      content='Visit Original'
                      onClick={() => {
                        if (
                          activeModel.url &&
                          typeof activeModel.url === "string"
                        ) {
                          const fullUrl =
                            activeModel.url.startsWith("http://") ||
                            activeModel.url.startsWith("https://")
                              ? activeModel.url
                              : `http://${activeModel.url}`
                          window.open(fullUrl, "_blank")
                        }
                      }}
                    />
                  ) : null}
                </p>
                <Segment className='darkBg'>
                  <Header as='h5' style={{ margin: "0  0 10px 0" }}>
                    <Icon name='download' />
                    Files
                  </Header>
                  {renderDownloadFiles()}
                </Segment>
                <Segment className='darkBg'>
                  <Header as='h5' style={{ margin: "0 0 10px 0" }}>
                    <Icon name='tags' />
                    Tags
                  </Header>
                  {renderModelTags()}
                </Segment>
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
  isEdit,
}: {
  modelData: ModelData[]
  projectData: ProjectData[]
  projectModelData: any
  isEdit?: boolean
}) => {
  const { id } = useParams<{ id: string }>()

  // Find the active project using the 'id' parameter
  const activeProject = projectData.find((project) => project.id === id)

  if (isEdit) {
    return (
      <EditProject
        projectData={projectData}
        modelData={modelData}
        projectModelData={projectModelData}
      />
    )
  }

  // Extract project models with matching IDs
  const projectModelIds =
    projectModelData
      ?.filter((row: any) => row.project_id === activeProject?.id)
      .map((row: any) => row.model_id) || []

  const matchingModels = modelData.filter((model) =>
    projectModelIds.includes(model.id)
  )

  return (
    <>
      {activeProject && (
        <>
          <div>
            <h3>{activeProject.name}</h3>
            <div>
              Models:
              <br />
              {matchingModels.length
                ? matchingModels.map((model: ModelData) => (
                    <div key={model.id} style={{ marginTop: "10px" }}>
                      <Link href={`/models/${model.id}`}>{model.name}</Link>
                    </div>
                  ))
                : "None"}
            </div>
          </div>
          <div>
            Description: <br />
            {activeProject.description}
          </div>
        </>
      )}
    </>
  )
}

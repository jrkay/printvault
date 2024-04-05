import { useParams } from "next/navigation"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react"
import EditModel from "@/components/model/EditModel"
import ImageGallery from "react-image-gallery"
import {
  FileData,
  ImageData,
  ModelData,
  ModelTags,
  TagData,
  UserData,
} from "@/utils/appTypes"
import { getModelTags } from "@/api/api/modelTagApi"
import { formattedDate } from "@/utils/helpers/uiHelpers"

export const ModelDetailFields = ({
  modelData,
  imageData,
  activeUser,
  isEdit,
  fileData,
  userData,
}: {
  modelData: ModelData[]
  imageData: ImageData[]
  activeUser?: string
  isEdit?: boolean
  fileData: FileData[]
  userData: UserData[]
}) => {
  const { id } = useParams<{ id: string }>()
  const [modelTags, setModelTags] = useState<ModelTags[]>([])
  const [activeModelTags, setActiveModelTags] = useState<string[]>([])
  const [isLoadingModelTags, setIsLoadingModelTags] = useState(false)

  // Find the active model using the 'id' parameter
  const activeModel = modelData?.find((model) => model.id === id)

  useEffect(() => {
    if (activeModel) {
      setIsLoadingModelTags(true)

      getModelTags(activeModel.id)
        .then((modelTagData: any[]) => {
          const tagNames = modelTagData.map((tagData) => tagData.name)
          setActiveModelTags(tagNames)
        })
        .catch((error) => {
          console.error("Error fetching model tags:", error)
        })
        .finally(() => {
          setIsLoadingModelTags(false)
        })
    }
  }, [activeModel])

  // Filter images related to the active model
  const activeImages =
    imageData?.filter(
      (image: ImageData) => image.model_id === activeModel?.id
    ) || []

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
    if (activeModelTags.length === 0) {
      return <span>No Tags</span>
    } else {
      return activeModelTags.map((tag) => (
        <span
          key={tag}
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            padding: "2px 5px",
            borderRadius: "5px",
            margin: "0 3px",
            fontSize: "14px",
          }}
          className='bg-255-1'
        >
          {tag}
        </span>
      ))
    }
  }

  // Map images to format suitable for ImageGallery component
  const imageArray = activeImages.map((image: ImageData) => ({
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
                  <Icon name='cube' size='huge' />
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
                  Uploaded on {formattedDate(activeModel.created_at)} by{" "}
                  {userData.length ? (
                    userData
                      .filter((user) => user.id === activeModel.user_id)
                      .map((user) => (
                        <span key={user.id} style={{ marginLeft: "3px" }}>
                          <Link href={`/account/${user.username}`}>
                            {user.username}
                          </Link>
                        </span>
                      ))
                  ) : (
                    <span>PrintVault User</span>
                  )}
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <></>
      )}
    </>
  )
}

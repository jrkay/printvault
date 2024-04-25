import React, { useState, useCallback } from "react"
import {
  Header,
  Form,
  TextArea,
  Segment,
  Image,
  Icon,
  Card,
  DropdownProps,
  Grid,
} from "semantic-ui-react"
import { updateModel } from "@/api/api/modelApi"
import { useParams } from "next/navigation"
import {
  FileProps,
  ImageProps,
  ModelProps,
  ModelTagProps,
} from "@/utils/appTypes"
import { licenseOptions, typeOptions } from "@/utils/uiConstants"
import ImageUpload from "@/components/image/ImageUpload"
import FileUpload from "@/components/file/FileUpload"
import ImageDelete from "@/components/image/ImageDelete"
import FileDelete from "@/components/file/FileDelete"
import { v4 as uuidv4 } from "uuid"
import { addModelTags, deleteModelTags } from "@/api/api/modelTagApi"
import Link from "next/link"
import { refresh } from "@/utils/helpers/uiHelpers"
import CancelButton from "../CancelButton"

const EditModel = ({
  modelData,
  modelTags,
  fileData,
  imageData,
  activeUser,
}: {
  modelData: ModelProps[]
  modelTags: ModelTagProps[]
  fileData: FileProps[]
  imageData: ImageProps[]
  activeUser?: string
}) => {
  const { id } = useParams<{ id: string }>()
  const activeModel = modelData.find((model: ModelProps) => model.id === id)
  const [hasChanges, setHasChanges] = useState(false)

  const [name, setName] = useState(activeModel?.name || "")
  const [description, setDescription] = useState(activeModel?.description || "")
  const [type, setType] = useState(activeModel?.type || "")
  const [license, setLicense] = useState(activeModel?.license || "")
  const [url, setUrl] = useState(activeModel?.url || "")
  const [newId, setNewId] = useState(uuidv4)
  const [newTag, setNewTag] = useState("")

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: string }) => {
      setHasChanges(true)

      switch (name) {
        case "name":
          setName(value)
          break
        case "description":
          setDescription(value)
          break
        case "type":
          setType(value)
          break
        case "tags":
          setNewTag(value)
          break
        case "license":
          setLicense(value)
          break
        case "url":
          setUrl(value)
        default:
          break
      }
    },
    []
  )

  const handleTagChange = (
    e: any,
    { name, value }: { name: string; value: string }
  ) => {
    setNewTag(value)
  }

  const filteredModelTags = () => {
    const tagList = modelTags.filter(
      (tag: ModelTagProps) => tag.model_id === activeModel?.id
    )

    if (tagList.length === 0) {
      return <>No Tags</>
    } else {
      return tagList.map((tag: ModelTagProps) => {
        return (
          <a
            key={tag.id}
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              padding: "2px 5px",
              borderRadius: "5px",
              margin: "0 3px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            className='bg-255-1'
            onClick={() => handleTagButtonDelete(tag)}
          >
            {tag.name}
          </a>
        )
      })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await updateModel({
      id: activeModel?.id,
      name: name.trim(),
      description: description.trim(),
      type,
      license,
      url: url.trim(),
      last_updated: new Date().toISOString(),
    })

    // TODO - instead display success message
    window.location.reload()
  }

  const handleTagSubmit = async () => {
    // TODO check for duplicate tags before adding
    // const modelTag = modelTags.find(
    //   (mt: any) => mt.tags.name === newTag.toLowerCase()
    // )
    // if (!modelTag) {
    await addModelTags({
      name: newTag.toLowerCase(),
      id: newId,
      model_id: activeModel?.id,
    })
    // }
  }

  const handleTagButtonDelete = async (tag: ModelTagProps) => {
    try {
      await deleteModelTags({
        tag_id: tag.tag_id,
        id: tag.id,
        model_id: activeModel?.id,
      })
    } catch (error) {
      console.error("Error deleting model tags:", error)
    }
  }

  const renderFiles = () => {
    const modelFiles = fileData
      .filter((file: FileProps) => file.model_id === activeModel?.id)
      .map((file: FileProps, index: number) => {
        const extension = file.href.match(/\.(\w{3})(?=\?|$)/)?.[1]
        return (
          <div key={index}>
            <FileDelete
              file={file}
              activeUser={activeUser}
              modalDisplay={
                <Icon
                  name='minus square outline'
                  style={{
                    cursor: "pointer",
                    padding: "0",
                    margin: "0 5px 0 0",
                  }}
                  size='large'
                />
              }
            />
            <a href={file.href} download style={{ fontSize: "18px" }}>
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

  const renderImage = (model: ModelProps) => {
    const filteredImages = imageData.filter(
      (image: ImageProps) => image.model_id === model.id
    )

    if (filteredImages.length > 0) {
      return (
        <>
          {filteredImages.map((image: ImageProps) => (
            <React.Fragment key={image.id}>
              <Card
                style={{
                  background: "rgb(0,0,0,.05)",
                  boxShadow: "none",
                  margin: "10px",
                }}
              >
                <Image
                  key={image.id}
                  alt=''
                  src={image.href}
                  style={{
                    margin: "10px",
                  }}
                />
                <Card.Content style={{ padding: "0 0 10px 0" }}>
                  <ImageDelete
                    image={image}
                    activeUser={activeUser}
                    modalDisplay={
                      <Icon
                        name='minus square outline'
                        style={{
                          cursor: "pointer",
                          width: "100%",
                        }}
                        size='large'
                      />
                    }
                  />
                </Card.Content>
              </Card>
            </React.Fragment>
          ))}
        </>
      )
    } else {
      return (
        <p
          style={{
            padding: "70px",
            background: "rgb(0,0,0,.05)",
            textAlign: "center",
          }}
        >
          <Icon name='cube' size='huge' />
        </p>
      )
    }
  }

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column
            largeScreen={2}
            widescreen={2}
            computer={2}
            tablet={2}
            mobile={14}
            style={{ maxWidth: "200px" }}
          >
            <Grid stackable padded style={{ padding: "50px 0 0 0" }}>
              {CancelButton()}
            </Grid>
          </Grid.Column>

          <Grid.Column
            largeScreen={11}
            widescreen={11}
            computer={11}
            tablet={11}
            mobile={14}
            style={{ maxWidth: "1500px" }}
          >
            <Grid.Row style={{ paddingTop: "50px" }}>
              <Segment color='violet' className='darkBg' padded='very'>
                <Form onSubmit={handleSubmit}>
                  <Form.Group widths={"equal"}>
                    <Form.Input
                      id='form-name'
                      name='name'
                      value={name}
                      required
                      label='Model Name'
                      onChange={(e) =>
                        handleChange(e, { name: "name", value: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group widths={"equal"}>
                    <Form.Field
                      style={{ minHeight: "150px" }}
                      id='form-description'
                      name='description'
                      control={TextArea}
                      value={description}
                      required
                      label='Model Description'
                      onChange={(e: any) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Dropdown
                      selection
                      label='Type of Print'
                      name='form-type'
                      options={typeOptions}
                      placeholder={type}
                      onChange={(e: any, { value }: DropdownProps) =>
                        setType(value as string)
                      }
                      value={type}
                      style={{ width: "100%" }}
                    />
                    <Form.Dropdown
                      selection
                      label='License'
                      name='form-license'
                      options={licenseOptions}
                      placeholder={license}
                      onChange={(e: any, { value }: DropdownProps) =>
                        setLicense(value as string)
                      }
                      value={license}
                      style={{ width: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group widths={"equal"}>
                    <Form.Input
                      id='form-url'
                      name='url'
                      value={url}
                      label='Model URL'
                      onChange={(e) =>
                        handleChange(e, { name: "url", value: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group widths={"equal"}>
                    <Form.Button
                      basic
                      color='violet'
                      content='Update Model'
                      fluid
                      type='submit'
                      disabled={!hasChanges}
                      style={{
                        width: "50%",
                        margin: "20px 0 0 0",
                        maxWidth: "250px",
                        float: "inline-end",
                      }}
                    />
                  </Form.Group>
                </Form>
              </Segment>
              <Segment color='violet' className='darkBg' padded='very'>
                <Form>
                  <Form.Group widths={2}>
                    <Form.Input
                      id='form-tag'
                      name='tag'
                      required
                      action={{
                        icon: "add",
                        onClick: () => {
                          handleTagSubmit()
                        },
                      }}
                      placeholder={"Add a Tag..."}
                      label='Tags'
                      onChange={(e) =>
                        handleTagChange(e, {
                          name: "tags",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
                <p style={{ fontSize: "1em", margin: "0 0 10px 0px" }}>
                  Click to Remove Tag
                </p>
                <div style={{ width: "100%", padding: "0 0 10px 0px" }}>
                  {filteredModelTags()}
                </div>
              </Segment>
              <Segment color='violet' className='darkBg' padded='very'>
                <Header as='h4'>
                  Model Images (
                  {
                    imageData.filter(
                      (image: ImageProps) => image.model_id === activeModel?.id
                    ).length
                  }
                  )
                  <br />
                  <ImageUpload
                    activeModel={activeModel}
                    activeUser={activeUser}
                    modalDisplay={
                      <Icon
                        name='plus square outline'
                        style={{ cursor: "pointer", padding: "0" }}
                        size='large'
                      />
                    }
                  />
                </Header>
                <div style={{ display: "flex" }}>
                  {renderImage(activeModel!)}
                </div>
              </Segment>
              <Segment color='violet' className='darkBg' padded='very'>
                <Header as='h4'>
                  Model Files (
                  {
                    fileData.filter(
                      (file: FileProps) => file.model_id === activeModel?.id
                    ).length
                  }
                  )
                  <br />
                  <FileUpload
                    activeModel={activeModel}
                    activeUser={activeUser}
                    modalDisplay={
                      <Icon
                        name='plus square outline'
                        style={{ cursor: "pointer", padding: "0" }}
                        size='large'
                      />
                    }
                  />
                </Header>
                {renderFiles()}
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default EditModel

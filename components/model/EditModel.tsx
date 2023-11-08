import React, { useState, useCallback, useEffect } from "react"
import {
  Header,
  Form,
  TextArea,
  Segment,
  Image,
  Icon,
  Card,
  Dropdown,
  DropdownProps,
} from "semantic-ui-react"
import { updateModel } from "@/api/model/_updateModel"
import { updateModelTags } from "@/api/modelTag/_updateModelTags"
import { addModelTags } from "@/api/modelTag/_addModelTags"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import {
  FileData,
  ModelData,
  ModelTags,
  UserData,
} from "@/utils/AppRoutesProps"
import { licenseOptions, typeOptions } from "@/utils/const"
import ImageUpload from "@/components/image/ImageUpload"
import FileUpload from "@/components/file/FileUpload"
import ImageDelete from "@/components/image/ImageDelete"
import FileDelete from "@/components/file/FileDelete"

const EditModel = ({
  modelData,
  modelTags,
  fileData,
  imageData,
  userData,
}: {
  modelData: ModelData[]
  modelTags: ModelTags[]
  fileData: FileData[]
  imageData: any
  userData: UserData[]
}) => {
  const { id } = useParams<{ id: string }>()
  const activeModel = modelData.find((model: any) => model.id === id)
  const router = useRouter()
  const [hasChanges, setHasChanges] = useState(false)

  const [name, setName] = useState(activeModel?.name || "")
  const [description, setDescription] = useState(activeModel?.description || "")
  const [type, setType] = useState(activeModel?.type || "")
  const [tags, setTags] = useState("")
  const [license, setLicense] = useState(activeModel?.license || "")
  const [url, setUrl] = useState(activeModel?.url || "")
  const [image, setImage] = useState("")

  useEffect(() => {
    if (activeModel) {
      if (activeModel.name) {
        setName(activeModel.name)
      }
      if (activeModel.description) {
        setDescription(activeModel.description)
      }
      if (activeModel.type) {
        setType(activeModel.type)
      }
      if (activeModel.license) {
        setLicense(activeModel.license)
      }
      if (activeModel.url) {
        setUrl(activeModel.url)
      }
    }

    const tagList = modelTags.filter(
      (tag: any) => tag.model_id === activeModel?.id
    )

    setTags(
      tagList
        .map((tag: any) => {
          return tag.tags.name
        })
        .join(", ")
    )
  }, [])

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
          setTags(value)
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

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await updateModel({
      id: activeModel?.id,
      name,
      description,
      type,
      license,
      url,
    })

    // Split tags by comma and push into array
    const tagsArray = tags.split(",").map((tag) => tag.trim())

    const duplicateTags = tagsArray.filter((tag) => {
      return (modelTags || []).some((modelTag: any) => {
        return (
          modelTag.model_id === activeModel?.id && modelTag.tag_id.name === tag
        )
      })
    })

    // find duplicate names and target them for update
    for (let i = 0; i < tagsArray.length; i++) {
      const modelTag = (modelTags || []).find(
        (mt: any) => mt.tag_id.name === tagsArray[i]
      )
      if (modelTag) {
        await updateModelTags({
          name: tagsArray[i],
          id: modelTag.tag_id,
        })
      }
    }

    // find duplicate names and exclude them when adding
    for (let i = 0; i < tagsArray.length; i++) {
      const modelTag = (modelTags || []).find(
        (mt: any) => mt.tag_id.name === tagsArray[i]
      )
      if (!modelTag) {
        await addModelTags({
          name: tagsArray[i],
          id: crypto.randomUUID(),
        })
      }
    }
    // navigate("/models/" + id)
    window.location.reload()
  }

  const renderFiles = () => {
    const modelFiles = fileData
      .filter((file: any) => file.model_id === activeModel?.id)
      .map((file: any, index: number) => {
        const extension = file.href.match(/\.(\w{3})(?=\?|$)/)?.[1]
        return (
          <div key={index}>
            <FileDelete
              file={file}
              activeUser={userData}
              activeModel={activeModel}
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

  const renderImage = (model: ModelData) => {
    const filteredImages = imageData.filter(
      (image: any) => image.model_id === model.id
    )

    if (filteredImages.length > 0) {
      return (
        <>
          {filteredImages.map((image: any) => (
            <>
              <Card
                style={{
                  background: "rgb(255,255,255,.05)",
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
                    activeUser={userData}
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
            </>
          ))}
        </>
      )
    } else {
      return (
        <p
          style={{
            padding: "70px",
            background: "rgb(255,255,255,.05)",
            textAlign: "center",
          }}
        >
          No Images
        </p>
      )
    }
  }

  const icon = (
    <Icon
      name='plus square outline'
      style={{ cursor: "pointer", padding: "0" }}
      size='large'
    />
  )

  return (
    <>
      <Segment
        color='teal'
        style={{ background: "rgb(0, 0, 0, .35)" }}
        padded='very'
      >
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
          <Form.Group widths={2}>
            <Form.Input
              id='form-tag'
              name='tag'
              value={tags}
              disabled
              label='Tags'
              onChange={(e) =>
                handleChange(e, { name: "tags", value: e.target.value })
              }
            />
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
              fluid
              type='submit'
              disabled={!hasChanges}
              style={{
                width: "50%",
                margin: "20px 0 0 0",
                maxWidth: "250px",
                float: "inline-end",
              }}
            >
              Update Model
            </Form.Button>
          </Form.Group>
        </Form>
      </Segment>
      <Segment
        color='blue'
        style={{ background: "rgb(0, 0, 0, .35)" }}
        padded='very'
      >
        <Header as='h4'>
          Model Images
          <span style={{ color: "rgb(255,255,255,.5)" }}>
            (
            {
              imageData.filter(
                (image: any) => image.model_id === activeModel?.id
              ).length
            }
            )
          </span>
          <br />
          <ImageUpload
            activeModel={activeModel}
            activeUser={userData}
            modalDisplay={
              <Icon
                name='plus square outline'
                style={{ cursor: "pointer", padding: "0" }}
                size='large'
              />
            }
          />
        </Header>
        <div style={{ display: "flex" }}>{renderImage(activeModel!)}</div>
      </Segment>
      <Segment
        color='violet'
        style={{ background: "rgb(0, 0, 0, .35)" }}
        padded='very'
      >
        <Header as='h4'>
          Model Files
          <span style={{ color: "rgb(255,255,255,.5)" }}>
            (
            {
              fileData.filter((file: any) => file.model_id === activeModel?.id)
                .length
            }
            )
          </span>
          <br />
          <FileUpload
            activeModel={activeModel}
            activeUser={userData}
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
    </>
  )
}

export default EditModel

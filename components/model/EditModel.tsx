import React, { useState, useCallback } from "react"
import {
  Header,
  Form,
  TextArea,
  Segment,
  Icon,
  DropdownProps,
  Grid,
} from "semantic-ui-react"
import { updateModel } from "@/api/api/modelApi"
import { useParams } from "next/navigation"
import { FileProps, ImageProps, ModelProps } from "@/utils/appTypes"
import { licenseOptions, typeOptions } from "@/utils/uiConstants"
import FileUpload from "@/components/file/FileUpload"
import FileDelete from "@/components/file/FileDelete"
import CancelButton from "@/components/CancelButton"
import ModelTags from "@/components/model/EditModelTags"
import ModelImages from "@/components/model/EditModelImages"
import { User } from "@supabase/supabase-js"

const EditModel = ({
  modelData,
  modelTags,
  fileData,
  imageData,
  activeUser,
}: {
  modelData: ModelProps[]
  modelTags: any
  fileData: FileProps[]
  imageData: ImageProps[]
  activeUser: User
}) => {
  const { id } = useParams<{ id: string }>()
  const activeModel = modelData.find((model: ModelProps) => model.id === id)
  const [hasChanges, setHasChanges] = useState(false)
  const [name, setName] = useState(activeModel?.name || "")
  const [description, setDescription] = useState(activeModel?.description || "")
  const [type, setType] = useState(activeModel?.type || "")
  const [license, setLicense] = useState(activeModel?.license || "")
  const [url, setUrl] = useState(activeModel?.url || "")

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

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column
            largescreen={2}
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
            largescreen={11}
            widescreen={11}
            computer={11}
            tablet={11}
            mobile={14}
            style={{ maxWidth: "1500px" }}
          >
            <Grid.Row style={{ paddingTop: "50px" }}>
              <Segment color='violet' padded='very'>
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
              <ModelTags
                modelTags={modelTags}
                activeModelId={activeModel?.id}
              />
              <ModelImages
                activeModel={activeModel}
                imageData={imageData}
                activeUser={activeUser}
              />
              <Segment color='violet' padded='very'>
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

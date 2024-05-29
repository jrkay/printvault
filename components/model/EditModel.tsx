import React, { useState, useCallback, useEffect } from "react"
import {
  Form,
  TextArea,
  Segment,
  DropdownProps,
  Grid,
  Message,
  Button,
} from "semantic-ui-react"
import { updateModel } from "@/api/api/modelApi"
import { useParams } from "next/navigation"
import { FileProps, ImageProps, ModelProps } from "@/utils/appTypes"
import { licenseOptions, typeOptions } from "@/utils/uiConstants"
import CancelButton from "@/components/CancelButton"
import ModelTags from "@/components/model/EditModelTags"
import ModelImages from "@/components/model/EditModelImages"
import { User } from "@supabase/supabase-js"
import ModelFiles from "@/components/model/EditModelFiles"
import DeleteModel from "./DeleteModel"

const EditModel = ({
  modelData,
  modelTags,
  fileData,
  imageData,
  activeUser,
  projectData,
}: {
  modelData: ModelProps[]
  modelTags: any
  fileData: FileProps[]
  imageData: ImageProps[]
  activeUser: User
  projectData: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeModel = modelData.find((model: ModelProps) => model.id === id)

  const [initialState, setInitialState] = useState({
    name: activeModel?.name || "",
    description: activeModel?.description || "",
    type: activeModel?.type || "",
    license: activeModel?.license || "",
    url: activeModel?.url || "",
  })

  const [currentState, setCurrentState] = useState(initialState)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setHasChanges(
      initialState.name !== currentState.name ||
        initialState.description !== currentState.description ||
        initialState.type !== currentState.type ||
        initialState.license !== currentState.license ||
        initialState.url !== currentState.url
    )
  }, [currentState, initialState])

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: string }) => {
      setCurrentState((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    },
    []
  )

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await updateModel({
      id: activeModel?.id,
      name: currentState.name.trim(),
      description: currentState.description.trim(),
      type: currentState.type,
      license: currentState.license,
      url: currentState.url.trim(),
      last_updated: new Date().toISOString(),
    })

    setSuccessMessage("Model updated successfully!")
    setInitialState(currentState)
    setHasChanges(false)
  }

  const handleReturnToModel = () => {
    location.reload()
  }

  return (
    <>
      <Grid centered style={{ paddingTop: "50px" }}>
        <Grid.Row>
          <Grid.Column
            largescreen={2}
            widescreen={2}
            computer={2}
            tablet={2}
            mobile={14}
            style={{ maxWidth: "200px" }}
          >
            <Grid.Row style={{ marginBottom: "20px" }}>
              <Button
                color='violet'
                content='Return to Model'
                fluid
                onClick={handleReturnToModel}
              />
            </Grid.Row>
            {/* <Grid.Row style={{ marginBottom: "20px" }}>
              <CancelButton />
            </Grid.Row> */}
            <Grid.Row>
              <DeleteModel
                projectData={projectData}
                activeModel={activeModel}
              />
            </Grid.Row>
          </Grid.Column>

          <Grid.Column
            largescreen={11}
            widescreen={11}
            computer={11}
            tablet={11}
            mobile={14}
            style={{ maxWidth: "1500px" }}
          >
            <Grid.Row>
              <Segment color='violet' padded='very'>
                <Form onSubmit={handleSubmit}>
                  <Form.Group widths={"equal"}>
                    <Form.Input
                      id='form-name'
                      name='name'
                      value={currentState.name}
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
                      value={currentState.description}
                      required
                      label='Model Description'
                      onChange={(e: any) =>
                        handleChange(e, {
                          name: "description",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Dropdown
                      selection
                      label='Type of Print'
                      name='type'
                      options={typeOptions}
                      placeholder='Select Type'
                      onChange={(e: any, { value }: DropdownProps) =>
                        handleChange(e, {
                          name: "type",
                          value: value as string,
                        })
                      }
                      value={currentState.type}
                      style={{ width: "100%" }}
                    />
                    <Form.Dropdown
                      selection
                      label='License'
                      name='license'
                      options={licenseOptions}
                      placeholder='Select License'
                      onChange={(e: any, { value }: DropdownProps) =>
                        handleChange(e, {
                          name: "license",
                          value: value as string,
                        })
                      }
                      value={currentState.license}
                      style={{ width: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group widths={"equal"}>
                    <Form.Input
                      id='form-url'
                      name='url'
                      value={currentState.url}
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
                      }}
                    />
                  </Form.Group>
                </Form>
                {successMessage && (
                  <Message positive>
                    <Message.Header>Success</Message.Header>
                    <p>{successMessage}</p>
                  </Message>
                )}
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
              <ModelFiles
                activeModel={activeModel}
                fileData={fileData}
                activeUser={activeUser}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default EditModel

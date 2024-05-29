"use client"

import React, { useState, useCallback, useEffect } from "react"
import {
  Header,
  Form,
  TextArea,
  Table,
  Checkbox,
  Segment,
  DropdownProps,
  Grid,
  Divider,
} from "semantic-ui-react"
import { addProject } from "@/api/api/projectApi"
import { addProjectModel as addProjectModels } from "@/api/api/projectModelApi"
import { truncate } from "@/utils/helpers/uiHelpers"
import { statusOptions } from "@/utils/uiConstants"
import { useRouter } from "next/navigation"
import CancelButton from "@/components/CancelButton"
import { ModelProps } from "@/utils/appTypes"

const ProjectAddDisplay = ({
  userData,
  modelData,
}: {
  userData: string | undefined
  modelData: ModelProps[]
}) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [comments, setComments] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: string }) => {
      switch (name) {
        case "name":
          setName(value)
          break
        case "description":
          setDescription(value)
          break
        case "status":
          setStatus(value)
          break
        case "comments":
          setComments(value)
          break
        default:
          break
      }
    },
    []
  )

  useEffect(() => {
    setHasChanges(
      name.trim() !== "" && description.trim() !== "" && status.trim() !== ""
    )
  }, [name, description, status])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const projectUUID = crypto.randomUUID().toString()

    setIsLoading(true)

    try {
      await addProject({
        id: projectUUID,
        name,
        description,
        status,
        comments,
        user_id: userData,
      })

      const addProjectModelsPromises = selectedIds.map(async (selectedId) => {
        const projectModelUUID = crypto.randomUUID().toString()
        await addProjectModels({
          id: projectModelUUID,
          model_id: selectedId,
          project_id: projectUUID,
        })
      })

      await Promise.all(addProjectModelsPromises)

      setName("")
      setDescription("")
      setComments("")
      setStatus("")

      router.replace("/projects/" + projectUUID)
    } catch (error) {
      console.error("Error adding project:", error)
    }
  }

  const projectModelsTable = (modelData: ModelProps[]) => {
    if (modelData) {
      return (
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Select</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {modelData.map((model: ModelProps) => (
              <Table.Row key={model.id}>
                <Table.Cell>
                  <Checkbox onChange={() => toggleSelectedId(model.id)} />
                </Table.Cell>
                <Table.Cell>{model.name}</Table.Cell>
                <Table.Cell>{truncate(model.description, 100, 300)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    }
    return <></>
  }

  const toggleSelectedId = (selectedId: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(selectedId)
        ? prevSelectedIds.filter((id) => id !== selectedId)
        : [...prevSelectedIds, selectedId]
    )
  }

  const disabled = userData === undefined

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
              <CancelButton />
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
              <Segment padded='very' color='violet'>
                <Header as='h2'>Add A New Project</Header>
                <Form onSubmit={handleSubmit}>
                  <Form.Group widths={"equal"} disabled={disabled}>
                    <Form.Input
                      id='form-name'
                      name='name'
                      label='Project Name'
                      value={name}
                      required
                      onChange={(e) =>
                        handleChange(e, {
                          name: "name",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group widths={"equal"} disabled={disabled}>
                    <Form.Field
                      id='form-description'
                      name='description'
                      label='Description'
                      control={TextArea}
                      value={description}
                      required
                      onChange={(e: any) =>
                        handleChange(e, {
                          name: "description",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group widths={2} disabled={disabled}>
                    <Form.Dropdown
                      selection
                      required
                      label='Project Status'
                      name='status'
                      options={statusOptions}
                      placeholder='Select Status'
                      onChange={(e: any, { value }: DropdownProps) =>
                        handleChange(e, {
                          name: "status",
                          value: value as string,
                        })
                      }
                      value={status}
                    />
                  </Form.Group>
                  <Form.Field
                    id='form-comments'
                    name='comments'
                    control={TextArea}
                    value={comments}
                    label='Comments'
                    disabled={disabled}
                    onChange={(e: any) => setComments(e.target.value)}
                  />
                  <Divider horizontal />
                  <Form.Group widths={"equal"} disabled={disabled}>
                    <Form.Field label='Models to Include' />
                  </Form.Group>
                  <Form.Group widths={"equal"} disabled={disabled}>
                    <Segment
                      color='violet'
                      style={{
                        maxHeight: "300px",
                        overflow: "scroll",
                      }}
                      padded='very'
                    >
                      {projectModelsTable(modelData)} <br />
                    </Segment>
                  </Form.Group>
                  <Form.Group widths={"equal"} disabled={disabled}>
                    <Form.Button
                      basic
                      color='violet'
                      content={isLoading ? "Please wait..." : "Add Project"}
                      fluid
                      type='submit'
                      style={{
                        width: "50%",
                        margin: "20px 0 0 0",
                        maxWidth: "250px",
                        float: "inline-end",
                      }}
                      disabled={!hasChanges || isLoading}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default ProjectAddDisplay

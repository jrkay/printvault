"use client"

import React, { useState, useCallback } from "react"
import {
  Header,
  Form,
  TextArea,
  Table,
  Checkbox,
  Segment,
  DropdownProps,
  Grid,
  Button,
  Divider,
} from "semantic-ui-react"
import { addProject } from "@/api/project/_addProject"
import { addProjectModel as addProjectModels } from "@/api/projectModel/_addProjectModels"
import { truncate } from "@/utils/const"
import { statusOptions } from "@/utils/const"
import { useRouter } from "next/navigation"

const ProjectAddDisplay = ({
  userData,
  modelData,
}: {
  userData: any
  modelData: any
}) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [status, setStatus] = useState("")
  const [comments, setComments] = useState("")

  let selectedIds: string[] = []

  const router = useRouter()

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: any }) => {
      switch (name) {
        case "name":
          setName(value)
          break
        case "description":
          setDescription(value)
          break
        case "start_date":
          setStartDate(value)
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

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const projectUUID = crypto.randomUUID().toString()

    await addProject({
      id: projectUUID,
      name,
      description,
      startDate,
      status,
      comments,
      userId: userData.user.id,
    })
      .then(() => {
        const addProjectModelsPromises = selectedIds.map(async (selectedId) => {
          const projectModelUUID = crypto.randomUUID()

          await addProjectModels({
            id: projectModelUUID,
            modelId: selectedId,
            projectId: projectUUID,
          })
        })

        return Promise.all(addProjectModelsPromises)
      })
      .catch((error) => {
        console.error("Error adding project:", error)
      })

    setName("")
    setDescription("")
    setStartDate("")
    setComments("")
    setStatus("")

    router.replace("/projects/" + projectUUID)
  }

  const projectModelsTable = (modelData: any) => {
    if (modelData) {
      return (
        <Table selectable>
          <Table.Header>
            <Table.Row></Table.Row>
          </Table.Header>
          <Table.Body>
            {modelData.map((model: any) => (
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

    function toggleSelectedId(selectedId: string) {
      if (selectedIds.includes(selectedId)) {
        selectedIds = selectedIds.filter((id: string) => id !== selectedId)
      } else {
        selectedIds = selectedIds.concat(selectedId)
      }
    }
  }

  const refresh = () => {
    window.location.reload()
  }

  const BackLink = () => {
    return (
      <Button
        basic
        color='violet'
        content='Cancel'
        href={`/projects/`}
        onClick={() => refresh()}
        className='sideNavButton'
        compact
      />
    )
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
              {BackLink()}
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
              <Segment className='darkBg' padded='very' color='violet'>
                <Header as='h2'>Add A New Project</Header>
                <Form onSubmit={handleSubmit}>
                  <Form.Group widths={"equal"}>
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
                  <Form.Group widths={"equal"}>
                    <Form.Field
                      id='form-description'
                      name='description'
                      label='Description'
                      control={TextArea}
                      value={description}
                      required
                      onChange={(e: any) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Dropdown
                      selection
                      required
                      label='Project Status'
                      name='form-status'
                      options={statusOptions}
                      placeholder={status}
                      onChange={(e: any, { value }: DropdownProps) =>
                        setStatus(value as string)
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
                    onChange={(e: any) => setComments(e.target.value)}
                  />
                  <Divider horizontal />
                  <Form.Group widths={"equal"}>
                    <Form.Field label='Models to Include' />
                  </Form.Group>
                  <Form.Group widths={"equal"}>
                    <Segment
                      color='violet'
                      className='darkBg'
                      style={{
                        maxHeight: "300px",
                        overflow: "scroll",
                      }}
                      padded='very'
                    >
                      {projectModelsTable(modelData)} <br />
                    </Segment>
                  </Form.Group>
                  <Form.Group widths={"equal"}>
                    <Form.Button
                      basic
                      color='violet'
                      content='Add New Project'
                      fluid
                      type='submit'
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
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default ProjectAddDisplay

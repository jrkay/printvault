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
import { addProjectModels } from "@/api/projectModel/_addProjectModels"
import { truncate } from "@/utils/const"
import { ModelData } from "@/utils/AppRoutesProps"
import { statusOptions } from "@/utils/const"
import SemanticDatepicker from "react-semantic-ui-datepickers"

const ProjectAddDisplay = ({
  userData,
  modelData,
  projectModelData,
}: {
  userData: any
  modelData: any
  projectModelData: any
}) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [enddate, setEndDate] = useState("")
  const [status, setStatus] = useState("")
  const [comments, setComments] = useState("")
  const [userId, setUserId] = useState("")
  const [projectId, setProjectId] = useState("")

  let selectedIds: string[] = []

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
        case "end_date":
          setEndDate(value)
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
    setProjectId(crypto.randomUUID())

    setUserId(userData[0]?.id)

    e.preventDefault()

    await addProject({
      id: projectId,
      name,
      description,
      startDate,
      status,
      comments,
      userId: userId,
    })

    for (let i = 0; i < selectedIds.length; i++) {
      await addProjectModels({
        id: crypto.randomUUID(),
        modelId: selectedIds[i],
        projectId: projectId,
      })
    }

    setName("")
    setDescription("")
    setStartDate("")
    setComments("")
    setStatus("")

    // window.location.reload()
  }

  const projectModelsTable = (modelData: any) => {
    if (modelData) {
      return (
        <Table selectable inverted>
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
        href={`/projects/`}
        onClick={() => refresh()}
        style={{}}
        className='sideNavButton'
        compact
      >
        Cancel
      </Button>
    )
  }

  const handleStartDateChange = (event: any, data: any) =>
    setStartDate(data.value)
  const handleEndDateChange = (event: any, data: any) => setEndDate(data.value)

  return (
    console.log("modelData", modelData),
    (
      <>
        <Grid centered>
          <Grid.Row style={{}}>
            <Grid.Column
              largeScreen={2}
              widescreen={2}
              computer={2}
              tablet={2}
              mobile={14}
              className='pageContainer'
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
              className='pageContainer'
              style={{ maxWidth: "1500px" }}
            >
              <Grid.Row style={{ paddingTop: "50px" }}>
                <Segment
                  style={{ background: "rgb(0, 0, 0, .35)" }}
                  padded='very'
                  color='teal'
                >
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
                    <Form.Group widths={2} style={{}}>
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
                      {status === "Complete" ||
                      status === "In Progress" ||
                      status === "Paused" ? (
                        <div
                          style={{
                            width: "50%",
                            display: "inline-grid",
                          }}
                        >
                          <Form.Field label='Start Date' />
                          <SemanticDatepicker
                            onChange={handleStartDateChange}
                          />
                        </div>
                      ) : (
                        <> </>
                      )}
                      {status === "Complete" ? (
                        <div
                          style={{
                            width: "50%",
                            display: "inline-grid",
                            margin: "auto 7px",
                          }}
                        >
                          <Form.Field label='End Date' />
                          <SemanticDatepicker onChange={handleEndDateChange} />
                        </div>
                      ) : (
                        <> </>
                      )}
                    </Form.Group>

                    <Form.Field
                      id='form-comments'
                      name='comments'
                      control={TextArea}
                      value={comments}
                      label='Comments'
                      onChange={(e: any) => setDescription(e.target.value)}
                    />
                    <Divider horizontal />
                    <Form.Group widths={"equal"} style={{}}>
                      <Form.Field label='Models to Include' />
                    </Form.Group>
                    <Form.Group widths={"equal"}>
                      <Segment
                        color='blue'
                        style={{
                          background: "rgb(0, 0, 0, .35)",
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
                        fluid
                        type='submit'
                        style={{
                          width: "50%",
                          margin: "20px 0 0 0",
                          maxWidth: "250px",
                          float: "inline-end",
                        }}
                      >
                        Add New Project
                      </Form.Button>
                    </Form.Group>
                  </Form>
                </Segment>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  )
}

export default ProjectAddDisplay

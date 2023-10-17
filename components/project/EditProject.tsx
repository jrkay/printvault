import React, { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import { Grid, Divider, Header, Image, Form, TextArea } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"
import { updateProjectClient } from "../../app/helpers/updateHelpers"
import { useParams } from "react-router-dom"
import { Dropdown, DropdownProps } from "semantic-ui-react"
import Head from "next/head"
import { useNavigate } from "react-router-dom"

const licenseOptions = [
  {
    key: "1",
    text: "Creative Commons - Public Domain",
    value: "Creative Commons - Public Domain",
  },
  {
    key: "2",
    text: "Creative Commons - Attribution",
    value: "Creative Commons - Attribution",
  },
  {
    key: "3",
    text: "Creative Commons - Attribution-ShareAlike",
    value: "Creative Commons - Attribution-ShareAlike",
  },
  {
    key: "4",
    text: "Creative Commons - Attribution-NoDerivs",
    value: "Creative Commons - Attribution-NoDerivs",
  },
  {
    key: "5",
    text: "Creative Commons - Attribution-NonCommercial",
    value: "Creative Commons - Attribution-NonCommercial",
  },
  {
    key: "6",
    text: "Creative Commons - Attribution-NonCommercial-NoDerivs",
    value: "Creative Commons - Attribution-NonCommercial-NoDerivs",
  },
  {
    key: "7",
    text: "Creative Commons - Attribution-NonCommercial-ShareAlike",
    value: "Creative Commons - Attribution-NonCommercial-ShareAlike",
  },
  {
    key: "8",
    text: "GNU General Public License v2.0",
    value: "GNU General Public License v2.0",
  },
  {
    key: "9",
    text: "GNU Lesser General Public License v2.1",
    value: "GNU Lesser General Public License v2.1",
  },
]

const statusOptions = [
  { key: "1", text: "Not Started", value: "Not Started" },
  { key: "2", text: "In Progress", value: "In Progress" },
  { key: "3", text: "Paused", value: "Paused" },
  { key: "4", text: "Complete", value: "Complete" },
]

export const EditProject = ({ projectData }: { projectData: any }) => {
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((file: any) => file.id === id)
  const navigate = useNavigate()

  const [name, setName] = useState(activeProject?.name)
  const [description, setDescription] = useState(activeProject?.description)
  const [startDate, setStartDate] = useState(activeProject?.tags)
  const [endDate, setEndDate] = useState(activeProject?.license)
  const [status, setStatus] = useState(activeProject?.url)
  const [comments, setComments] = useState(activeProject?.comments)
  const [submittedData, setSubmittedData] = useState({
    submittedName: "",
    submittedDescription: "",
    submittedStartDate: "",
    submittedEndDate: "",
    submittedStatus: "",
    submittedComments: "",
  })

  useEffect(() => {
    if (activeProject) {
      if (activeProject.name) {
        setName(activeProject.name)
      }
      if (activeProject.description) {
        setDescription(activeProject.description)
      }
      if (activeProject.start_date) {
        setStartDate(activeProject.start_date)
      }
      if (activeProject.end_date) {
        setEndDate(activeProject.end_date)
      }
      if (activeProject.status) {
        setStatus(activeProject.status)
      }
      if (activeProject.comments) {
        setComments(activeProject.comments)
      }
    }
  }, [])

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: string }) => {
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
    e.preventDefault()
    setSubmittedData({
      submittedName: name,
      submittedDescription: description,
      submittedStartDate: startDate,
      submittedEndDate: endDate,
      submittedStatus: status,
      submittedComments: comments,
    })

    await updateProjectClient({
      id: activeProject.id,
      name,
      description,
      startDate,
      endDate,
      status,
      comments,
    })

    //  navigate("/projects/" + id)
    //    window.location.reload()
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Header as='h4'>File Name</Header>
        <Form.Input
          id='form-name'
          name='name'
          value={name}
          onChange={(e) =>
            handleChange(e, { name: "name", value: e.target.value })
          }
        />
        <Header as='h4'>Description</Header>
        <Form.Field
          id='form-description'
          name='description'
          control={TextArea}
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
        {/* <Header as='h4'>Type</Header>
        <Dropdown
          selection
          name='form-type'
          options={typeOptions}
          placeholder={type}
          onChange={(e: any, { value }: DropdownProps) =>
            setType(value as string)
          }
          value={type}
        /> */}
        <Header as='h4'>Status</Header>
        <Dropdown
          selection
          name='form-status'
          options={statusOptions}
          placeholder={status}
          onChange={(e: any, { value }: DropdownProps) =>
            setStatus(value as string)
          }
          value={status}
        />
        <Header as='h4'>Start Date</Header>
        <Form.Input
          id='form-startdate'
          name='startdate'
          value={startDate}
          onChange={(e) =>
            handleChange(e, { name: "start_date", value: e.target.value })
          }
        />
        <Header as='h4'>End Date</Header>
        <Form.Input
          id='form-enddate'
          name='enddate'
          value={endDate}
          onChange={(e) =>
            handleChange(e, { name: "end_date", value: e.target.value })
          }
        />
        <Form.Button type='submit'>Update Project</Form.Button>
      </Form>
      <strong>onChange:</strong>
      <pre>
        {JSON.stringify(
          { name, description, startDate, endDate, status, comments },
          null,
          2
        )}
      </pre>
      <strong>onSubmit:</strong>
      <pre>{JSON.stringify({ submittedData }, null, 2)}</pre>
    </>
  )
}

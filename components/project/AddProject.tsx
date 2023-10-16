import React, { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Grid,
  Divider,
  Header,
  Image,
  Form,
  TextArea,
  HeaderContent,
} from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"
import { addProjectClient } from "../../app/helpers/updateHelpers"
import { useParams } from "react-router-dom"
import { SetStateAction } from "react"
import { Dropdown, DropdownProps } from "semantic-ui-react"

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

const AddProject = ({ userData }: { userData: any }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [status, setStatus] = useState("")
  const [comments, setComments] = useState("")
  const [userId, setUserId] = useState("")

  const activeUser = userData[0].id

  const [submittedData, setSubmittedData] = useState({
    submittedName: "",
    submittedDescription: "",
    // submittedFiles: "",
    // submittedStartDate: "",
    // submittedEndDate: "",
    // submittedStatus: "",
    // submittedComments: "",
    submittedUserId: "",
  })

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: any }) => {
      switch (name) {
        case "name":
          setName(value)
          break
        case "description":
          setDescription(value)
          break
        case "files":
          setFiles(value)
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
    setUserId(activeUser || "")

    e.preventDefault()
    setSubmittedData({
      submittedName: name ?? "",
      submittedDescription: description ?? "",
      // submittedFiles: files ?? "",
      // submittedStartDate: startDate ?? "",
      // submittedEndDate: endDate ?? "",
      // submittedStatus: status ?? "",
      // submittedComments: comments ?? "",
      submittedUserId: activeUser,
    })

    // Call the updateFileClient function here
    await addProjectClient({
      id: null,
      name,
      description,
      // files,
      // startDate,
      // endDate,
      // status,
      // comments,
      userId,
    })

    setName("")
    setDescription("")
    setStartDate("")
    setEndDate("")
    setComments("")
    setStatus("")
    setFiles("")

    //    window.location.reload()
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Header as='h4'>Project Name</Header>
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
        <Form.Button type='submit'>Add New Project</Form.Button>
      </Form>

      <strong>onChange:</strong>
      <pre>
        {JSON.stringify(
          { name, description, files, startDate, endDate, status, comments },
          null,
          2
        )}
      </pre>
      <strong>onSubmit:</strong>
      <pre>{JSON.stringify({ submittedData }, null, 2)}</pre>
    </>
  )
}

export default AddProject

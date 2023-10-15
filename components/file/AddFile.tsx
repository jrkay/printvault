import React, { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import { Grid, Divider, Header, Image, Form, TextArea } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"
import { addFileClient } from "../../app/helpers/updateHelpers"
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

const typeOptions = [
  { key: "1", text: "FDM & Resin", value: "both" },
  { key: "2", text: "Resin", value: "resin" },
  { key: "3", text: "FDM", value: "FDM" },
]
const AddFile = ({ userData }: { userData: any }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [tags, setTags] = useState("")
  const [license, setLicense] = useState("")
  const [url, setUrl] = useState("")
  const [userId, setUserId] = useState("")

  const activeUser = userData[0].id

  const [submittedData, setSubmittedData] = useState({
    submittedName: "",
    submittedDescription: "",
    submittedType: "",
    submittedTags: "",
    submittedLicense: "",
    submittedUrl: "",
    submittedUserId: "",
  })

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: string }) => {
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
      submittedName: name,
      submittedDescription: description,
      submittedType: type,
      submittedTags: tags,
      submittedLicense: license,
      submittedUrl: url,
      submittedUserId: activeUser,
    })

    // Call the updateFileClient function here
    await addFileClient({
      id: null,
      created_at: null,
      name,
      url,
      userId,
      description,
      type,
      tags,
      license,
    })
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
        {/* <Form.Group> */}
        <Header as='h4'>Type</Header>
        <Dropdown
          selection
          name='form-type'
          options={typeOptions}
          placeholder={type}
          onChange={(e: any, { value }: DropdownProps) =>
            setType(value as string)
          }
          value={type}
        />
        <Header as='h4'>License</Header>
        <Dropdown
          selection
          name='form-license'
          options={licenseOptions}
          placeholder={license}
          onChange={(e: any, { value }: DropdownProps) =>
            setLicense(value as string)
          }
          value={license}
        />
        {/* </Form.Group> */}
        <Header as='h4'>File Tags</Header>
        <Form.Input
          id='form-tag'
          name='tag'
          value={tags}
          onChange={(e) =>
            handleChange(e, { name: "tags", value: e.target.value })
          }
        />
        <Header as='h4'>File URL</Header>
        <Form.Input
          id='form-url'
          name='url'
          value={url}
          onChange={(e) =>
            handleChange(e, { name: "url", value: e.target.value })
          }
        />
        <Form.Button type='submit'>Update</Form.Button>
      </Form>
      <strong>onChange:</strong>
      <pre>
        {JSON.stringify(
          { name, description, type, tags, license, url },
          null,
          2
        )}
      </pre>
      <strong>onSubmit:</strong>
      <pre>{JSON.stringify({ submittedData }, null, 2)}</pre>
    </>
  )
}

export default AddFile

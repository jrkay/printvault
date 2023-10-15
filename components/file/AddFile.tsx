import React, { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import { Grid, Divider, Header, Image, Form, TextArea } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"
import { addFileClient } from "../../app/helpers/updateHelpers"
import { useParams } from "react-router-dom"
import { DropdownProps } from "semantic-ui-react"
import { SetStateAction } from "react"

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
        <Form.Input
          key='form-name'
          label='File Name'
          id='form-name'
          name='name'
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <Form.Field
          id='form-description'
          name='description'
          control={TextArea}
          label='Description'
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
        <Form.Group widths={2}>
          <Form.Select
            key='form-type'
            fluid
            label='Type'
            name='type'
            options={typeOptions}
            placeholder='Print Type'
            onChange={(e: any, { value }: DropdownProps) =>
              setType(e.target.value)
            }
            value={type}
          />
          <Form.Input
            label='File Tags'
            id='form-tag'
            name='tag'
            value={tags}
            onChange={(e: any) => setTags(e.target.value)}
          />
        </Form.Group>
        <Form.Select
          fluid
          label='License'
          name='license'
          options={licenseOptions}
          placeholder='License'
          onChange={(e: any, { value }: DropdownProps) =>
            setLicense(e.target.value)
          }
          value={license}
        />
        <Form.Input
          label='File URL'
          id='form-url'
          name='url'
          value={url}
          onChange={(e: any) => setUrl(e.target.value || "")}
        />
        <Form.Button type='submit'>Add File Information</Form.Button>
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

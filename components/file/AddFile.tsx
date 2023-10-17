import React, { useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { Grid, Divider, Header, Form, TextArea } from "semantic-ui-react"
import { addFileClient } from "../../app/helpers/updateHelpers"
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
  const [displayNewFile, setDisplayNewFile] = useState(false)

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
    setDisplayNewFile(true)

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

    await addFileClient({
      id: null,
      name: name,
      description: description,
      type: type,
      tags: tags,
      license: license,
      url: url,
      userId: activeUser,
    })

    setName("")
    setDescription("")
    setType("")
    setTags("")
    setLicense("")
    setUrl("")

    window.location.reload()
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
        <Form.Button type='submit'>Add A New File</Form.Button>
      </Form>

      {displayNewFile ? (
        <>
          <Divider />
          <Header as='h3'>Added File</Header>
          <Grid padded style={{ border: "1px solid rgb(255, 255, 255, .05)" }}>
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as='h4'>{submittedData.submittedName}</Header>
                <p>{submittedData.submittedDescription}</p>
                <span style={{ fontWeight: "bold" }}>File URL: </span>
                <Link to={submittedData.submittedUrl} target='_blank'>
                  {submittedData.submittedUrl}
                </Link>
                <br />
                <span style={{ fontWeight: "bold" }}>File Tags:</span>{" "}
                {submittedData.submittedTags}
                <br />
                <p>
                  <span style={{ fontWeight: "bold" }}>Type of Print:</span>{" "}
                  {submittedData.submittedType}
                </p>
                <span style={{ fontWeight: "bold" }}>License:</span>{" "}
                {submittedData.submittedLicense}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ) : null}
    </>
  )
}

export default AddFile

import React, { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import { Grid, Divider, Header, Image, Form, TextArea } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"
import { updateFileClient } from "../../app/helpers/updateHelpers"
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

const typeOptions = [
  { key: "1", text: "FDM & Resin", value: "both" },
  { key: "2", text: "Resin", value: "resin" },
  { key: "3", text: "FDM", value: "FDM" },
]

export const EditFile = ({ fileData }: { fileData: any }) => {
  const { id } = useParams<{ id: string }>()
  const activeFile = fileData.find((file: any) => file.id === id)
  const navigate = useNavigate()

  const [name, setName] = useState(activeFile?.name || "")
  const [description, setDescription] = useState(activeFile?.description || "")
  const [type, setType] = useState(activeFile?.type || "")
  const [tags, setTags] = useState(activeFile?.tags || "")
  const [license, setLicense] = useState(activeFile?.license || "")
  const [url, setUrl] = useState(activeFile?.url || "")
  const [submittedData, setSubmittedData] = useState({
    submittedName: "",
    submittedDescription: "",
    submittedType: "",
    submittedTags: "",
    submittedLicense: "",
    submittedUrl: "",
  })

  useEffect(() => {
    if (activeFile) {
      if (activeFile.name) {
        setName(activeFile.name)
      }
      if (activeFile.description) {
        setDescription(activeFile.description)
      }
      if (activeFile.type) {
        setType(activeFile.type)
      }
      if (activeFile.tags) {
        setTags(activeFile.tags)
      }
      if (activeFile.license) {
        setLicense(activeFile.license)
      }
      if (activeFile.url) {
        setUrl(activeFile.url)
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
      submittedType: type,
      submittedTags: tags,
      submittedLicense: license,
      submittedUrl: url,
    })

    await updateFileClient({
      id: activeFile.id,
      name,
      description,
      type,
      tags,
      license,
      url,
    })

    navigate("/files/" + id)
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
      {/* <strong>onChange:</strong>
      <pre>
        {JSON.stringify(
          { name, description, type, tags, license, url },
          null,
          2
        )}
      </pre>
      <strong>onSubmit:</strong>
      <pre>{JSON.stringify({ submittedData }, null, 2)}</pre> */}
    </>
  )
}

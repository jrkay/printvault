import React, { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import { Grid, Divider, Header, Image, Form, TextArea } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"
import { updateFileClient } from "../../app/helpers/updateHelpers"
import { useParams } from "react-router-dom"

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

    // Call the updateFileClient function here
    await updateFileClient({
      id: activeFile.id,
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='File Name'
          id='form-name'
          name='name'
          value={name}
          onChange={(e) =>
            handleChange(e, { name: "name", value: e.target.value })
          }
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
            fluid
            label='Type'
            name='form-type'
            options={typeOptions}
            placeholder='Print Type'
            onChange={(e: any) => setType(e.target.value)}
            value={type}
          />
          <Form.Input
            label='File Tags'
            id='form-tag'
            name='tag'
            value={tags}
            onChange={(e) =>
              handleChange(e, { name: "tags", value: e.target.value })
            }
          />
        </Form.Group>
        <Form.Select
          fluid
          label='License'
          name='form-license'
          options={licenseOptions}
          placeholder='License'
          onChange={(e: any) => setLicense(e.target.value)}
          value={license}
        />
        <Form.Input
          label='File URL'
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

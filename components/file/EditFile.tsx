import React, { useState, useCallback, useEffect } from "react"
import { Header, Form, TextArea } from "semantic-ui-react"
import {
  updateFileClient,
  updateModelTags,
  addModelTags,
} from "../../app/helpers/updateHelpers"
import { useParams } from "react-router-dom"
import { Dropdown, DropdownProps } from "semantic-ui-react"
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

export const EditFile = ({
  modelData,
  modelTags,
}: {
  modelData: any
  modelTags: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeFile = modelData.find((file: any) => file.id === id)
  const navigate = useNavigate()
  const [hasChanges, setHasChanges] = useState(false)

  const [name, setName] = useState(activeFile?.name || "")
  const [description, setDescription] = useState(activeFile?.description || "")
  const [type, setType] = useState(activeFile?.type || "")
  const [tags, setTags] = useState("")
  const [license, setLicense] = useState(activeFile?.license || "")
  const [url, setUrl] = useState(activeFile?.url || "")

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
      if (activeFile.license) {
        setLicense(activeFile.license)
      }
      if (activeFile.url) {
        setUrl(activeFile.url)
      }
    }

    const tagList = modelTags.filter(
      (tag: any) => tag.model_id === activeFile.id
    )

    setTags(
      tagList
        .map((tag: any) => {
          return tag.tags.name
        })
        .join(", ")
    )
  }, [])

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: string }) => {
      setHasChanges(true)

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
          console.log(tags)
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

    await updateFileClient({
      id: activeFile.id,
      name,
      description,
      type,
      license,
      url,
    })

    // Split tags by comma and push into array
    const tagsArray = tags.split(",").map((tag) => tag.trim())

    const duplicateTags = tagsArray.filter((tag) => {
      return (modelTags || []).some((modelTag: any) => {
        return (
          modelTag.model_id === activeFile.id && modelTag.tag_id.name === tag
        )
      })
    })
    console.log("Duplicate tags:", duplicateTags)

    // find duplicate names and target them for update
    for (let i = 0; i < tagsArray.length; i++) {
      const modelTag = (modelTags || []).find(
        (mt: any) => mt.tag_id.name === tagsArray[i]
      )
      if (modelTag) {
        await updateModelTags({
          name: tagsArray[i],
          id: modelTag.tag_id.id,
        })
      }
    }

    // find duplicate names and exclude them when adding
    for (let i = 0; i < tagsArray.length; i++) {
      const modelTag = (modelTags || []).find(
        (mt: any) => mt.tag_id.name === tagsArray[i]
      )
      if (!modelTag) {
        await addModelTags({
          name: tagsArray[i],
          id: crypto.randomUUID(),
        })
      }
    }
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
          required
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
          required
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
          disabled
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
        <Form.Button type='submit' disabled={!hasChanges}>
          Update
        </Form.Button>
      </Form>
    </>
  )
}

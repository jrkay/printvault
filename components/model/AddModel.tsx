import React, { useState, useCallback } from "react"
import {
  Header,
  Form,
  TextArea,
  Segment,
  Dropdown,
  DropdownProps,
} from "semantic-ui-react"
import addModel from "@/api/model/_addModel"
import { typeOptions, licenseOptions } from "@/utils/const.tsx"
import { UserData } from "@/utils/AppRoutesProps"

const AddModel = ({ page, userData }: { page: any; userData: UserData[] }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [tags, setTags] = useState("")
  const [license, setLicense] = useState("")
  const [url, setUrl] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

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
    e.preventDefault()
    await addModel({
      id: null,
      name: name,
      description: description,
      type: type,
      license: license,
      url: url,
      userId: userData[0].id,
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
      <Segment style={{ background: "rgb(0, 0, 0, .35)" }} padded='very'>
        <Header as='h2'>Add A New Model</Header>
        <Form onSubmit={handleSubmit}>
          <Header as='h4'>Model Name</Header>
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
          <Header as='h4'>Model Tags</Header>
          <Form.Input
            id='form-tag'
            name='tag'
            value={tags}
            onChange={(e) =>
              handleChange(e, { name: "tags", value: e.target.value })
            }
          />
          <Header as='h4'>Model URL</Header>
          <Form.Input
            id='form-url'
            name='url'
            value={url}
            onChange={(e) =>
              handleChange(e, { name: "url", value: e.target.value })
            }
          />
          <Form.Button type='submit' disabled={!hasChanges}>
            Add A New Model
          </Form.Button>
        </Form>
      </Segment>
    </>
  )
}

export default AddModel

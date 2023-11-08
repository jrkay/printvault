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
          <Form.Group widths={"equal"}>
            <Form.Input
              id='form-name'
              name='name'
              value={name}
              required
              label='Model Name'
              onChange={(e) =>
                handleChange(e, { name: "name", value: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Form.Field
              style={{ minHeight: "150px" }}
              id='form-description'
              name='description'
              control={TextArea}
              value={description}
              required
              label='Model Description'
              onChange={(e: any) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Dropdown
              selection
              label='Type of Print'
              name='form-type'
              options={typeOptions}
              placeholder={type}
              onChange={(e: any, { value }: DropdownProps) =>
                setType(value as string)
              }
              value={type}
              style={{ width: "100%" }}
            />
            <Form.Dropdown
              selection
              label='License'
              name='form-license'
              options={licenseOptions}
              placeholder={license}
              onChange={(e: any, { value }: DropdownProps) =>
                setLicense(value as string)
              }
              value={license}
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input
              id='form-tag'
              name='tag'
              value={tags}
              disabled
              label='Tags'
              onChange={(e) =>
                handleChange(e, { name: "tags", value: e.target.value })
              }
            />
            <Form.Input
              id='form-url'
              name='url'
              value={url}
              label='Model URL'
              onChange={(e) =>
                handleChange(e, { name: "url", value: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Form.Button
              fluid
              type='submit'
              disabled={!hasChanges}
              style={{
                width: "50%",
                margin: "20px 0 0 0",
                maxWidth: "250px",
                float: "inline-end",
              }}
            >
              Add New Model
            </Form.Button>
          </Form.Group>
        </Form>
      </Segment>
    </>
  )
}

export default AddModel

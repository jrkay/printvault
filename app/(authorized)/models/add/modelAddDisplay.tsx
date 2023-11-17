"use client"

import React, { useState, useCallback } from "react"
import {
  Header,
  Form,
  TextArea,
  Segment,
  DropdownProps,
  Grid,
  Button,
} from "semantic-ui-react"
import { typeOptions, licenseOptions } from "@/utils/const.tsx"
import addModel from "@/api/model/_addModel"
import { deleteModelTags } from "@/api/modelTag/_deleteModelTags"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"

const ModelAddDisplay = ({ userData }: { userData: any }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [license, setLicense] = useState("")
  const [url, setUrl] = useState("")
  const [activeUser, setActiveUser] = useState([userData.user.id])

  const router = useRouter()

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
    const uuidModel = uuidv4().toString()

    await addModel({
      id: uuidModel,
      name: name.trim(),
      description: description.trim(),
      type: type,
      license: license,
      url: url.trim(),
      userId: activeUser[0],
    })

    setName("")
    setDescription("")
    setType("")
    setLicense("")
    setUrl("")

    router.replace(`/models/` + uuidModel)
  }

  const refresh = () => {
    window.location.reload()
  }

  const BackLink = () => {
    return (
      <Button
        basic
        color='violet'
        content='Cancel'
        href={`/models/`}
        onClick={() => refresh()}
        className='sideNavButton'
        compact
      />
    )
  }

  const filteredModelTags = () => {
    const tagList: any = []

    if (tagList.length === 0) {
      return <>No Tags</>
    } else {
      return tagList.map((tag: any) => {
        return (
          <a
            key={tag.id}
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "2px 5px",
              borderRadius: "5px",
              margin: "0 3px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            className='bg-255-1'
            onClick={() => handleTagButtonDelete(tag)}
          ></a>
        )
      })
    }
  }

  const handleTagButtonDelete = async (tag: any) => {
    try {
      await deleteModelTags({
        tag_id: tag.tag_id,
        id: tag.id,
        model_id: uuidv4,
      })
    } catch (error) {
      console.error("Error deleting model tags:", error)
    }
  }

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column
            largeScreen={2}
            widescreen={2}
            computer={2}
            tablet={2}
            mobile={14}
            style={{ maxWidth: "200px" }}
          >
            <Grid stackable padded style={{ padding: "50px 0 0 0" }}>
              {BackLink()}
            </Grid>
          </Grid.Column>
          <Grid.Column
            largeScreen={11}
            widescreen={11}
            computer={11}
            tablet={11}
            mobile={14}
            style={{ maxWidth: "1500px" }}
          >
            <Grid.Row style={{ paddingTop: "50px" }}>
              <Segment className='darkBg' padded='very' color='violet'>
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
                        handleChange(e, {
                          name: "name",
                          value: e.target.value,
                        })
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
                  <Form.Group widths={"equal"}>
                    <Form.Input
                      id='form-url'
                      name='url'
                      value={url}
                      label='Model URL'
                      onChange={(e) =>
                        handleChange(e, {
                          name: "url",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group widths={"equal"}>
                    <Form.Button
                      basic
                      color='violet'
                      content='Add New Model'
                      fluid
                      type='submit'
                      style={{
                        width: "50%",
                        margin: "20px 0 0 0",
                        maxWidth: "250px",
                        float: "inline-end",
                      }}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default ModelAddDisplay

"use client"

import React, { useState, useCallback, useEffect } from "react"
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
  const [tags, setTags] = useState("")
  const [license, setLicense] = useState("")
  const [url, setUrl] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [activeUser, setActiveUser] = useState([userData.user.id])

  const router = useRouter()

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

    console.log("OMG just show my ID: ", activeUser[0])
    await addModel({
      id: null,
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
    setTags("")
    setLicense("")
    setUrl("")

    // window.location.reload()
    // TODO route to new model
    router.replace(`/models/`)
    // window.location.reload()
  }

  const refresh = () => {
    window.location.reload()
  }

  const BackLink = () => {
    return (
      <Button
        href={`/models/`}
        onClick={() => refresh()}
        style={{}}
        className='sideNavButton'
        compact
      >
        Cancel
      </Button>
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
              background: "rgba(255, 255, 255, 0.1)",
              margin: "0 3px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => handleTagButtonDelete(tag)}
          >
            {/* {tag.tags.name} */}
          </a>
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
        <Grid.Row style={{}}>
          <Grid.Column
            largeScreen={2}
            widescreen={2}
            computer={2}
            tablet={2}
            mobile={14}
            className='pageContainer'
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
            className='pageContainer'
            style={{ maxWidth: "1500px" }}
          >
            <Grid.Row style={{ paddingTop: "50px" }}>
              <Segment
                style={{ background: "rgb(0, 0, 0, .35)" }}
                padded='very'
                color='teal'
              >
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
                    {/* <Form.Input
                      id='form-tag'
                      name='tag'
                      value={tags}
                      action={{
                        icon: "add",
                      }}
                      label='Tags'
                      onChange={(e) =>
                        handleChange(e, { name: "tags", value: e.target.value })
                      }
                    /> */}
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
                    {/* <div style={{ width: "100%", padding: "0 0 10px 5px" }}>
                      <p style={{ fontSize: "1em", margin: "0 0 4px 5px" }}>
                        Click to Remove Tag
                      </p>
                      {filteredModelTags()}
                    </div> */}
                    <Form.Button
                      fluid
                      type='submit'
                      // disabled={!hasChanges}
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
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default ModelAddDisplay

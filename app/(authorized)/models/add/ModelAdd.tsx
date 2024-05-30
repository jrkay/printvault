"use client"

import React, { useState, useCallback } from "react"
import {
  Header,
  Form,
  TextArea,
  Segment,
  DropdownProps,
  Grid,
} from "semantic-ui-react"
import { typeOptions, licenseOptions } from "@/utils/uiConstants"
import { addModel } from "@/api/api/modelApi"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import CancelButton from "@/components/CancelButton"

const ModelAddDisplay = ({ userData }: { userData: string | undefined }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [license, setLicense] = useState("")
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const disabled = userData === undefined

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
    setIsLoading(true)

    const uuidModel = uuidv4().toString()

    await addModel({
      id: uuidModel,
      name: name.trim(),
      description: description.trim(),
      type: type,
      license: license,
      url: url.trim(),
      user_id: userData,
    })

    setName("")
    setDescription("")
    setType("")
    setLicense("")
    setUrl("")

    router.replace(`/models/` + uuidModel)
  }

  const isSubmitDisabled = !name.trim() || !description.trim()

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column
            largescreen={2}
            widescreen={2}
            computer={2}
            tablet={2}
            mobile={14}
            style={{ maxWidth: "200px" }}
          >
            <Grid stackable padded style={{ padding: "50px 0 0 0" }}>
              <CancelButton />
            </Grid>
          </Grid.Column>
          <Grid.Column
            largescreen={11}
            widescreen={11}
            computer={11}
            tablet={11}
            mobile={14}
            style={{ maxWidth: "1500px" }}
          >
            <Grid.Row style={{ paddingTop: "50px" }}>
              <Segment padded='very' color='violet'>
                <Header as='h2'>Add A New Model</Header>
                <Form onSubmit={handleSubmit} disabled={disabled}>
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
                      disabled={disabled}
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
                      disabled={disabled}
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
                      disabled={disabled}
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
                      disabled={disabled}
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
                      disabled={disabled}
                    />
                  </Form.Group>
                  <Form.Group widths={"equal"}>
                    <Form.Button
                      basic
                      color='violet'
                      content={isLoading ? "Please wait..." : "Add Model"}
                      fluid
                      type='submit'
                      disabled={isSubmitDisabled || isLoading || disabled}
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

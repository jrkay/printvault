"use client"

import React, { useState } from "react"
import { Grid, Image, Button, Card, Icon } from "semantic-ui-react"
import { ModelProps, UserProps, ImageProps } from "@/utils/appTypes"
import { sortOptions } from "@/utils/uiConstants"
import { truncate } from "@/utils/helpers/uiHelpers"
import { formattedDate } from "@/utils/helpers/uiHelpers"
import Link from "next/link"

const ModelPageDisplay = ({
  modelData,
  imageData,
  userData,
  activeUser,
}: {
  modelData: ModelProps[]
  imageData: ImageProps[]
  userData: UserProps[]
  activeUser: any
}) => {
  const [sortOption, setSortOption] = useState("name")

  const sortedModels = Array.isArray(modelData)
    ? [...modelData].sort((a: any, b: any) => {
        if (sortOption === "nameA") {
          return a.name.localeCompare(b.name)
        } else if (sortOption === "nameZ") {
          return b.name.localeCompare(a.name)
        } else if (sortOption === "date") {
          return b.created_at.localeCompare(a.created_at)
        } else {
          return b.created_at.localeCompare(a.created_at)
        }
      })
    : []

  const sortInput = (
    <div>
      {sortOptions.map((option) => (
        <Button
          basic
          color='violet'
          content={option.text}
          key={option.value}
          onClick={() => setSortOption(option.value)}
          style={{ marginRight: "5px" }}
          className={`sort-button ${
            sortOption === option.value ? "active" : ""
          }`}
        />
      ))}
    </div>
  )

  const renderImage = (model: ModelProps) => {
    const filteredImages = imageData.filter(
      (image: ImageProps) => image.model_id === model.id
    )

    if (filteredImages.length > 0) {
      return (
        <>
          {filteredImages.slice(0, 1).map((image: ImageProps) => (
            <>
              <Image
                key={image.id}
                alt={image.id}
                src={image.href}
                style={{
                  minWidth: "100%",
                  height: "250px",
                  objectFit: "cover",

                  borderRadius: "5px 5px 0 0",
                }}
              />{" "}
              {model.shared_with ? (
                <>
                  <div
                    style={{
                      padding: "5px",
                      width: "55px",
                      float: "right",
                      zIndex: 100,
                      background: "rgb(255,255,255,.8)",
                      position: "absolute",
                      right: "0px",
                      top: "215px",
                      borderRadius: "10px 0 0 0",
                    }}
                  >
                    <Icon small name='share alternate' />{" "}
                    {model.shared_with.length}
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ))}
        </>
      )
    } else {
      return (
        <span
          style={{
            padding: "100px",
            background: "rgb(0,0,0,.05)",
            textAlign: "center",
            height: "250px",
          }}
        >
          <Icon name='cube' size='huge' />
        </span>
      )
    }
  }

  const header = (model: ModelProps) => {
    const user = userData.find((u) => u.id === model.user_id)
    if (!user) return null

    const date = formattedDate(model.created_at)

    return (
      <>
        <div style={{ fontSize: "1em", fontWeight: "500" }}>
          {truncate(model.name, 35, 35)}
        </div>
      </>
    )
  }

  const description = (model: ModelProps) => {
    const user = userData.find((u) => u.id === model.user_id)
    if (!user) return null

    const date = formattedDate(model.created_at)

    return (
      <Grid style={{ fontSize: "0.9em" }}>
        <Grid.Row style={{ paddingBottom: "0px" }}>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  const extra = (model: ModelProps) => {
    const user = userData.find((u) => u.id === model.user_id)
    if (!user) return null

    const date = formattedDate(model.created_at)

    return (
      <div style={{}}>
        <div style={{ fontSize: ".9em", float: "left" }}>
          Model by {user.username}
        </div>
        <div style={{ fontSize: ".7em", float: "right" }}>
          <Icon name='cloud upload' /> {date}
        </div>
      </div>
    )
  }

  return (
    <>
      <Grid
        centered
        style={{
          maxWidth: "1700px",
          margin: "0 auto",
        }}
      >
        <Grid.Row columns={2} style={{ margin: "0 75px" }}>
          <Grid.Column textAlign='left' verticalAlign='middle'>
            {sortInput}
          </Grid.Column>
          <Grid.Column textAlign='right'>
            {activeUser != null ? (
              <Button
                basic
                color='violet'
                as={Link}
                href='/models/add'
                size='large'
              >
                Upload Model
              </Button>
            ) : (
              <Button
                basic
                color='violet'
                as={Link}
                href='/'
                disabled
                size='large'
              >
                Upload Model
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card.Group centered>
              {sortedModels.map((model: ModelProps) => (
                <Card
                  key={model.id}
                  image={renderImage(model)}
                  header={header(model)}
                  description={description(model)}
                  extra={extra(model)}
                  href={"/models/" + model.id}
                />
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default ModelPageDisplay

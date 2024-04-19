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
            <Image
              key={image.id}
              alt={image.id}
              src={image.href}
              style={{
                minWidth: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          ))}
        </>
      )
    } else {
      return (
        <p
          style={{
            padding: "100px",
            background: "rgb(0,0,0,.05)",
            textAlign: "center",
            height: "250px",
          }}
        >
          <Icon name='cube' size='huge' />
        </p>
      )
    }
  }

  const extra = (model: ModelProps) => {
    const user = userData.find((u) => u.id === model.user_id)
    if (!user) return null

    const date = formattedDate(model.created_at)

    return (
      <div style={{ float: "right", textAlign: "end" }}>
        <div style={{ fontSize: "1em" }}>Model by {user.username}</div>
        <Icon name='cloud upload' /> {date}
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
                href='/models/add'
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
                  header={model.name}
                  description={truncate(model.description, 100, 200)}
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

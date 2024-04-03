"use client"

import React, { useState } from "react"
import {
  Grid,
  Image,
  Button,
  Segment,
  Card,
  Icon,
  Dropdown,
} from "semantic-ui-react"
import { ModelData, UserData } from "@/utils/appTypes"
import { sortOptions, filterOptions } from "@/utils/uiConstants"
import { truncate } from "@/utils/helpers/uiHelpers"
import Link from "next/link"

const ModelListDisplay = ({
  modelData,
  imageData,
  userData,
  activeUser,
}: {
  modelData: any
  imageData: any
  userData: UserData[]
  activeUser: UserData[]
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

  const renderImage = (model: ModelData) => {
    const filteredImages = imageData.filter(
      (image: any) => image.model_id === model.id
    )

    if (filteredImages.length > 0) {
      return (
        <>
          {filteredImages.slice(0, 1).map((image: any) => (
            <Image
              key={image.id}
              alt=''
              src={image.href}
              fluid
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
            padding: "115px",
            background: "rgb(0,0,0,.05)",
            textAlign: "center",
          }}
        >
          No Image
        </p>
      )
    }
  }

  const formattedDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-US")
  }

  const extra = (model: any) => {
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
      <Grid centered>
        <Grid.Column
          largeScreen={13}
          computer={12}
          tablet={12}
          mobile={14}
          style={{ maxWidth: "1700px" }}
        >
          <Segment padded='very' className='darkBg'>
            {sortInput}
            <br />
            <br />
            <Card.Group centered>
              {sortedModels.map((model: any) => (
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
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default ModelListDisplay

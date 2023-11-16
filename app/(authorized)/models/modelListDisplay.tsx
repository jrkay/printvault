"use client"

import React, { useState } from "react"
import { Grid, Image, Button, Segment, Card, Icon } from "semantic-ui-react"
import { ModelData, UserData } from "@/utils/AppRoutesProps"
import { sortOptions } from "@/utils/const"
import { truncate } from "@/utils/const"
import Link from "next/link"

const ModelListDisplay = ({
  modelData,
  imageData,
  userData,
}: {
  modelData: ModelData[]
  imageData: any
  userData: UserData[]
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
          key={option.value}
          onClick={() => setSortOption(option.value)}
          style={{ marginRight: "5px" }}
          className={`sort-button ${
            sortOption === option.value ? "active" : ""
          }`}
        >
          {option.text}
        </Button>
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
            background: "rgb(255,255,255,.05)",
            textAlign: "center",
          }}
        >
          No Image
        </p>
      )
    }
  }

  const formattedDate = (date: any) => {
    return new Date(date).toLocaleDateString(undefined)
  }

  const extra = (model: any) => (
    <>
      <div style={{ float: "right", textAlign: "end" }}>
        <div style={{ fontSize: "1em" }}>
          Model by{" "}
          {userData
            .filter((user: any) => user.id === model.user_id)
            .map((user: any) => (
              <Link href={"/account/" + user.username} key={user.id}>
                {user.username}
              </Link>
            ))}
        </div>
        <Icon name='cloud upload' /> {formattedDate(model.created_at)}
      </div>
    </>
  )

  return (
    <>
      <Grid centered className='pageStyle'>
        <Grid.Row>
          <Grid.Column
            largeScreen={13}
            widescreen={13}
            computer={12}
            tablet={12}
            mobile={14}
            className='pageContainer'
            style={{ maxWidth: "1700px" }}
          >
            <Segment
              style={{ background: "rgb(0, 0, 0, .35)" }}
              padded={"very"}
            >
              {sortInput}
              <br />
              <br />
              <Grid>
                <Grid.Column>
                  <Card.Group centered>
                    {sortedModels.map((model: any) => (
                      <Card
                        image={renderImage(model)}
                        header={model.name}
                        description={truncate(model.description, 100, 200)}
                        extra={extra(model)}
                        key={model.id}
                        href={"/models/" + model.id}
                        style={{
                          fontSize: "1em",
                          margin: "10px !important",
                        }}
                      />
                    ))}
                  </Card.Group>
                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default ModelListDisplay

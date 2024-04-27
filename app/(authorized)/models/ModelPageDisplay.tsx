"use client"

import React, { useState } from "react"
import { Grid, Image, Button, Card, Icon, Dropdown } from "semantic-ui-react"
import { ModelProps, UserProps, ImageProps } from "@/utils/appTypes"
import { sortOptions, modelFilterOptions } from "@/utils/uiConstants"
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
  const [filterType, setFilterType] = useState("")

  const filterModels = (modelData: any[], filterType: any) => {
    switch (filterType) {
      case "Resin":
        return modelData.filter(
          (model: { type: string }) => model.type === "Resin"
        )
      case "Filament":
        return modelData.filter(
          (model: { type: string }) => model.type === "Filament"
        )
      default:
        return modelData
    }
  }

  const sortModels = (modelData: any, sortOption: any) => {
    if (!modelData) {
      return []
    }
    try {
      switch (sortOption) {
        case "nameA":
          return [...modelData].sort((a, b) => a.name.localeCompare(b.name))
        case "nameZ":
          return [...modelData].sort((a, b) => b.name.localeCompare(a.name))
        case "date":
          return [...modelData].sort((a, b) =>
            b.created_at.localeCompare(a.created_at)
          )
        default:
          return [...modelData]
      }
    } catch (error) {
      console.error("Error sorting models:", error)
      return []
    }
  }

  const sortedModels = Array.isArray(modelData)
    ? sortModels(filterModels(modelData, filterType), sortOption)
    : []

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
            {/* Filter Dropdown */}
            <Dropdown
              selection
              clearable
              compact
              placeholder='All Types'
              options={modelFilterOptions}
              onChange={(e, data) => setFilterType(data.value as string)}
              className='filter-dropdown'
            />

            {/* Sort Buttons */}
            <div style={{ marginTop: "20px" }}>
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  basic
                  color='violet'
                  style={{ marginRight: "5px" }}
                  onClick={() => setSortOption(option.value)}
                  className={`sort-button ${
                    sortOption === option.value ? "active" : ""
                  }`}
                >
                  {option.text}
                </Button>
              ))}
            </div>
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

"use client"

import React, { useEffect, useState } from "react"
import { Grid, Image, Button, Card, Icon, Dropdown } from "semantic-ui-react"
import { ModelProps, UserProps, ImageProps } from "@/utils/appTypes"
import { sortOptions, modelFilterOptions } from "@/utils/uiConstants"
import { truncate } from "@/utils/helpers/uiHelpers"
import { formattedDate } from "@/utils/helpers/uiHelpers"
import Link from "next/link"
import { getFilteredAndSortedModels, SortOption } from "@/utils/modelUtils"
import { getImages } from "@/api/api/imageApi"

type ImagesDictionary = {
  [key: string]: ImageProps[]
}

const ModelPageDisplay = ({
  modelData,
  userData,
  activeUser,
}: {
  modelData: ModelProps[]
  userData: UserProps[]
  activeUser: any
}) => {
  const initialImagesDict: ImagesDictionary = {}
  const [imagesData, setImagesData] =
    useState<ImagesDictionary>(initialImagesDict)
  const [filterType, setFilterType] = useState<string>("")
  const [sortOption, setSortOption] = useState<SortOption>("nameA")

  const filteredAndSortedModels = getFilteredAndSortedModels(
    modelData,
    filterType,
    sortOption
  )

  useEffect(() => {
    const fetchImages = async () => {
      const imagesPromises = modelData.map(async (model) => {
        const images = await getImages(activeUser, model.id)
        return { modelId: model.id, images }
      })

      const imagesData = await Promise.all(imagesPromises)
      // Convert the array of objects into a dictionary where the key is the modelId
      const imagesDict = imagesData.reduce((acc: ImagesDictionary, obj) => {
        acc[obj.modelId] = obj.images
        return acc
      }, initialImagesDict)
      setImagesData(imagesDict)
    }

    fetchImages()
  }, [activeUser, modelData])

  const renderImage = (model: ModelProps) => {
    const modelImages = imagesData[model.id] || []

    if (modelImages.length > 0) {
      const firstImage = modelImages[0]
      return (
        <>
          <>
            <Image
              key={firstImage.id}
              alt={firstImage.id}
              src={firstImage.href}
              style={{
                minWidth: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "5px 5px 0 0",
              }}
            />
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
                  <Icon size='small' name='share alternate' />
                  {model.shared_with.length}
                </div>
              </>
            ) : (
              <></>
            )}
          </>
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

    return (
      <>
        <div style={{ fontSize: "1em", fontWeight: "500" }}>
          {truncate(model.name, 50, 50)}
        </div>
      </>
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

  const sortInput = (
    <div>
      {sortOptions.map((option) => (
        <Button
          basic
          color={sortOption === option.value ? "teal" : "violet"}
          content={option.text}
          key={option.value}
          onClick={() => setSortOption(option.value as SortOption)}
          style={{ marginRight: "5px" }}
          className={`sort-button ${
            sortOption === option.value ? "active" : ""
          }`}
        />
      ))}
    </div>
  )

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
            <div style={{ marginTop: "20px" }}>{sortInput}</div>
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
              {filteredAndSortedModels.map((model: ModelProps) => (
                <Card
                  key={model.id}
                  image={renderImage(model)}
                  header={header(model)}
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

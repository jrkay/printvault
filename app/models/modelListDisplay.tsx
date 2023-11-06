"use client"

import React, { useState } from "react"
import { Grid, Image, Button } from "semantic-ui-react"
import { ModelData, UserData } from "@/utils/AppRoutesProps"
import { sortOptions } from "@/utils/const"
import TopMenu from "@/components/TopMenu"
import Details from "@/components/nav/DataDisplay"
import Footer from "@/components/Footer"

const ModelListDisplay = ({
  modelData,
  imageData,
  userData,

  activeUser,
  modelTags,
  fileData,
  projectModelData,
  projectData,
}: {
  modelData: ModelData[]
  imageData: any
  userData: UserData[]
  activeUser: any
  modelTags: any
  fileData: any
  projectModelData: any
  projectData: any
}) => {
  const [sortOption, setSortOption] = useState("name")
  const [modelInfo, setModelInfo] = useState<ModelData[]>([])

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

  return (
    <>
      <div>
        <TopMenu activeUser={activeUser} />
      </div>
      <div>
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
              <Details
                userData={userData}
                modelData={modelData}
                projectData={projectData}
                imageData={imageData}
                projectModelData={projectModelData}
                page={"Models"}
                isAdd={false}
                activeUser={activeUser}
                modelTags={modelTags}
                fileData={fileData}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default ModelListDisplay

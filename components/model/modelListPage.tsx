import React, { useState } from "react"
import { Grid, Image, Card, Button, Segment } from "semantic-ui-react"
import { truncate } from "@/api/pageHelpers"
import AddModel from "@/components/model/AddModel"
import { ModelData, UserData } from "@/utils/AppRoutesProps"
import { sortOptions } from "@/utils/const"

const ModelsList = ({
  modelData,
  imageData,
  userData,
  isAdd,
  displaySort,
}: {
  modelData: ModelData[]
  imageData: ImageData[]
  userData: UserData[]
  isAdd?: boolean
  displaySort: boolean
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
    const filteredImages = imageData
      ? imageData.filter((image: any) => image.model_id === model.id)
      : []

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
      {isAdd ? (
        <AddModel page='ModelAdd' userData={userData} />
      ) : (
        <>
          <Segment style={{ background: "rgb(0, 0, 0, .35)" }} padded={"very"}>
            {displaySort ? sortInput : null}
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
                      key={model.id}
                      href={"/models/" + model.id}
                      style={{
                        fontSize: "14px",
                        margin: "10px !important",
                      }}
                    />
                  ))}
                </Card.Group>
              </Grid.Column>
            </Grid>
          </Segment>
        </>
      )}
    </>
  )
}

{
  /* Keep this for 'table' option */
}
{
  /* <Grid padded divided>
            {sortedModels.map((model: any) => (
              <Grid.Row
                key={model.id}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid rgb(255, 255, 255, .3)",
                }}
              >
                <Grid.Column
                  width={3}
                  style={{
                    background: "rgb(255, 255, 255, .1)",
                    textAlign: "center",
                    display: "flex !important",
                  }}
                >
                  <Link to={"/models/" + model.id}>
                    {imageData
                      .filter((image: any) => image.model_id === model.id)
                      .slice(0, 1)
                      .map((image: any) => (
                        <Image
                          key={image.id}
                          alt=''
                          src={image.href}
                          style={{ width: "300px" }}
                        />
                      ))}
                    {imageData.filter(
                      (image: any) => image.model_id === model.id
                    ).length === 0 && (
                      <p style={{ padding: "25px" }}>No Image</p>
                    )}
                  </Link>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Link to={"/models/" + model.id}>{model.name}</Link>
                  <br />
                  {truncate(model.description, 100, 200)}
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid> */
}

export default ModelsList

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, Image, Dropdown, DropdownProps } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"
import AddModel from "./AddModel"
import { ModelData, ModelTags, UserData } from "@/app/AppRoutesProps"

export const ModelsList = ({
  modelData,
  imageData,
  userData,
  isAdd,
  activeUser,
  modelTags,
}: {
  modelData: ModelData[]
  imageData: ImageData[]
  userData: UserData[]
  isAdd?: boolean
  activeUser: any
  modelTags: ModelTags[]
}) => {
  const [sortOption, setSortOption] = useState("name")

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value)
  }

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

  const sortOptions = [
    { key: "1", text: "Sort by Name A-Z", value: "nameA" },
    { key: "2", text: "Sort by Name Z-A", value: "nameZ" },
    { key: "3", text: "Newest Created", value: "date" },
  ]

  return (
    <>
      {isAdd ? (
        <AddModel userData={userData} />
      ) : (
        <>
          <Dropdown
            selection
            name='dropdown-sort-models'
            options={sortOptions}
            placeholder={sortOptions[2].text}
            onChange={(e: any, { value }: DropdownProps) =>
              setSortOption(value as string)
            }
            value={sortOption}
          />
          <br />
          <br />
          <Grid padded divided>
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
          </Grid>
        </>
      )}
    </>
  )
}

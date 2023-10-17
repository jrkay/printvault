import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, Image, Dropdown, DropdownProps } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"
import AddFile from "./AddFile"

export const FilesList = ({
  fileData,
  imageData,
  userData,
  isAdd,
}: {
  fileData: any
  imageData: any
  userData: any
  isAdd?: any
}) => {
  const [sortOption, setSortOption] = useState("name")

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value)
  }

  const sortedFiles = [...fileData].sort((a: any, b: any) => {
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

  const sortOptions = [
    { key: "1", text: "Sort by Name A-Z", value: "nameA" },
    { key: "2", text: "Sort by Name Z-A", value: "nameZ" },
    { key: "3", text: "Newest Created", value: "date" },
  ]

  return (
    <>
      {isAdd ? (
        <AddFile userData={userData} />
      ) : (
        <>
          <Dropdown
            selection
            name='dropdown-sort-files'
            options={sortOptions}
            placeholder={sortOptions[2].text}
            onChange={(e: any, { value }: DropdownProps) =>
              setSortOption(value as string)
            }
            value={sortOption}
            defaultValue={"date"}
          />
          <br />
          <br />
          <Grid padded divided>
            {sortedFiles.map((file: any) => (
              <Grid.Row
                key={file.id}
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
                  <Link to={"/files/" + file.id}>
                    {imageData
                      .filter((image: any) => image.file_id === file.id)
                      .map((image: any) => (
                        <Image
                          key={image.id}
                          alt=''
                          src={image.href}
                          style={{ width: "300px" }}
                        />
                      ))}
                  </Link>
                  {imageData.filter((image: any) => image.file_id === file.id)
                    .length === 0 && (
                    <p style={{ padding: "25px" }}>No Image</p>
                  )}
                </Grid.Column>
                <Grid.Column width={13}>
                  <Link to={"/files/" + file.id}>{file.name}</Link>
                  <br />
                  {truncate(file.description, 100, 200)}
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
        </>
      )}
    </>
  )
}

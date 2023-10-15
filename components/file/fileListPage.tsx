import React from "react"
import { Link } from "react-router-dom"
import { Grid, Header, Image } from "semantic-ui-react"
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
  return (
    <>
      {isAdd ? (
        <AddFile userData={userData} />
      ) : (
        <Grid divided>
          {fileData.map((file: any) => (
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
                  .length === 0 && <p style={{ padding: "25px" }}>No Image</p>}
              </Grid.Column>
              <Grid.Column width={13}>
                <Link to={"/files/" + file.id}>{file.name}</Link>
                <br />
                {truncate(file.description, 100, 100)}
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      )}
    </>
  )
}

"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Grid, Modal, Button, Header } from "semantic-ui-react"
import TopMenu from "../../components/TopMenu"
import DetailsExpanded from "./DetailsExpanded"
import { deleteFileClient } from "../helpers/updateHelpers"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import DeleteLink from "../../components/file/DeleteFile.tsx"

export default function Details({
  data,
  userData,
  fileData,
  projectData,
  jobData,
  imageData,
  page,
}: {
  data: any
  userData: any
  fileData: any
  projectData: any
  jobData: any
  imageData: any
  page?: any
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  const { id } = useParams<{ id: string }>()
  const activeFile = fileData.find((file: any) => file.id === id)

  const BackLink = () => {
    const router = useRouter()
    return (
      <a onClick={() => router.back()} style={{ cursor: "pointer" }}>
        Back
      </a>
    )
  }

  const EditLink = () => {
    return (
      <a onClick={() => setIsEdit(true)} style={{ cursor: "pointer" }}>
        Edit File
      </a>
    )
  }

  const AddLink = () => {
    return (
      <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
        Add a New File
      </a>
    )
  }

  // const DeleteLink = () => {
  //   return displayModal()
  // }

  return (
    <>
      <div>
        <TopMenu data={data} userData={userData} />
      </div>
      <Grid padded centered>
        <Grid.Row>
          <Grid.Column width={2} className='pageContainer'>
            <p>{BackLink()}</p>

            {isEdit ? (
              <>
                <p>Add an Image</p>
                <p>Add a Job</p>
                <p style={{ fontWeight: "bold" }}>
                  {DeleteLink(fileData, activeFile)}
                </p>
              </>
            ) : (
              <>
                {isAdd ? (
                  <></>
                ) : (
                  <>
                    <p>{AddLink()}</p>
                    <p>{EditLink()}</p>
                    <p style={{ fontWeight: "bold" }}>
                      <DeleteLink fileData={fileData} />
                    </p>
                  </>
                )}
              </>
            )}
          </Grid.Column>
          <Grid.Column
            width={8}
            className='pageContainer'
            style={{ minWidth: "700px" }}
          >
            <DetailsExpanded
              data={data}
              userData={userData}
              fileData={fileData}
              projectData={projectData}
              jobData={jobData}
              imageData={imageData}
              page={page}
              isEdit={isEdit}
              isAdd={isAdd}
            />
          </Grid.Column>
          <Grid.Column width={1} className='pageContainer'></Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Grid } from "semantic-ui-react"
import TopMenu from "../../components/TopMenu"
import DetailsExpanded from "./DetailsExpanded"

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
        Edit
      </a>
    )
  }

  return (
    <>
      <div>
        <TopMenu data={data} userData={userData} />
      </div>
      <Grid padded centered>
        <Grid.Row>
          <Grid.Column width={2} className='pageContainer'>
            {BackLink()}
            <br />
            <br />
            {isEdit ? (
              <></>
            ) : (
              <>
                {EditLink()}
                <br />
                <br />
                Add an Image
                <br />
                Add a Job
                <br />
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
            />
          </Grid.Column>
          <Grid.Column width={1} className='pageContainer'></Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

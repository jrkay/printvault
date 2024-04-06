"use client"

import React, { useEffect, useState } from "react"
import { Button, Grid, Header, Icon, Segment, Image } from "semantic-ui-react"
import { useParams } from "next/navigation"
import DeleteProject from "@/components/project/DeleteProject"
import {
  ImageProps,
  ModelProps,
  ProjectProps,
  ProjectModelProps,
  UserProps,
} from "@/utils/appTypes"
import Link from "next/link"
import EditProject from "@/components/project/EditProject"
import ShareButton from "@/components/ShareButton"
import ModalComponent from "@/components/ModalComponent"
import CancelButton from "@/components/CancelButton"
import { formattedDate } from "@/utils/helpers/uiHelpers"

export default function ProjectDetailDisplay({
  modelData,
  projectData,
  projectModelData,
  imageData,
  userData,
  activeUser,
}: {
  modelData: ModelProps[]
  projectData: ProjectProps[]
  projectModelData: ProjectModelProps[]
  imageData: ImageProps[]
  userData: UserProps[]
  activeUser: string | undefined
}) {
  const [isEdit, setIsEdit] = useState(false)
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find(
    (project: ProjectProps) => project.id === id
  )

  const limitedProjectModels = projectModelData?.filter(
    (row: any) => row.project_id === activeProject?.id
  )
  const username = userData
    .filter((user: UserProps) => user.id === activeProject?.user_id)
    .map((user: UserProps) => user.username)

  const EditLink = () => {
    if (isEdit) {
      return <></>
    } else {
      return (
        <a onClick={() => setIsEdit(true)} style={{ cursor: "pointer" }}>
          Edit Project
        </a>
      )
    }
  }

  const getDeleteLink = () => {
    if (!isEdit && activeProject) {
      return (
        <div style={{ fontWeight: "bold", marginTop: "20px" }}>
          {}
          <DeleteProject
            activeProject={activeProject}
            projectModelData={projectModelData}
          />
        </div>
      )
    } else {
      return <></>
    }
  }

  const renderImage = (model: ModelProps) => {
    const filteredImage = imageData.find(
      (image: ImageProps) => image.model_id === model.id
    )

    if (filteredImage) {
      return (
        <>
          <Image
            key={filteredImage.id}
            alt=''
            src={filteredImage.href}
            fluid
            style={{
              height: "200px",
              width: "200px",
              objectFit: "cover",
            }}
          />
        </>
      )
    } else {
      return (
        <p
          style={{
            background: "rgb(0,0,0,.05)",
            textAlign: "center",
            height: "185px",
            width: "185px",
          }}
        ></p>
      )
    }
  }

  const findMatchingIds = () => {
    let modelsToRender: JSX.Element[] = []

    if (limitedProjectModels) {
      const matchingModels = modelData.filter((row: any) =>
        limitedProjectModels.some(
          (modelId: ProjectModelProps) => modelId.model_id === row.id
        )
      )

      modelsToRender = matchingModels.map((model: ModelProps) => (
        <React.Fragment key={model.id}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>{renderImage(model)}</Grid.Column>
              <Grid.Column width={12}>
                <Header as='h4'>
                  <Link
                    href={"/models/" + model.id}
                    key={model.id}
                    style={{
                      marginBottom: "10px",
                      fontSize: "0.8em",
                    }}
                  >
                    {model.name}
                  </Link>
                </Header>
                <Button
                  basic
                  color='violet'
                  content='Visit Original'
                  onClick={() => window.open(model.url?.toString(), "_blank")}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </React.Fragment>
      ))
      return modelsToRender
    }
  }

  const createdAt = activeProject?.created_at
  const lastUpdated = activeProject?.last_updated

  function renderProjectActions(
    activeUser: string,
    activeProject: ProjectProps,
    isEdit: boolean
  ) {
    if (!activeUser) {
      return null
    }

    return (
      <div style={{ padding: "50px 0 0 15px" }}>
        {!isEdit ? (
          <>
            {EditLink()} <br />
            {activeUser === activeProject.user_id && (
              <>
                {getDeleteLink()} <br />
                <ModalComponent
                  triggerText='Share Project'
                  content={<ShareButton activeProject={activeProject} />}
                />
              </>
            )}
          </>
        ) : (
          <>{CancelButton()}</>
        )}
      </div>
    )
  }

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column
            largeScreen={2}
            widescreen={2}
            computer={2}
            tablet={2}
            mobile={14}
            style={{ maxWidth: "200px", padding: "50px 0 0 20px" }}
          >
            {activeUser &&
              activeProject &&
              renderProjectActions(activeUser, activeProject, isEdit)}
          </Grid.Column>
          <Grid.Column
            largeScreen={11}
            widescreen={11}
            computer={11}
            tablet={11}
            mobile={14}
            style={{ maxWidth: "1500px", paddingTop: "50px" }}
          >
            {isEdit ? (
              <EditProject
                projectData={projectData}
                modelData={modelData}
                projectModelData={projectModelData}
              />
            ) : (
              <>
                <Grid.Row>
                  {activeProject ? (
                    <>
                      <Grid padded>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <div>
                              <Header as='h3'>{activeProject.name}</Header>
                              <div style={{ fontSize: "1em" }}>
                                Project by{" "}
                                {username ? (
                                  <Link href={`/account/${username}`}>
                                    {username}
                                  </Link>
                                ) : (
                                  <span>PrintVault User</span>
                                )}
                              </div>
                              <p style={{ margin: "0", fontSize: ".8em" }}>
                                <Icon name='cloud upload' />
                                Created on{" "}
                                <span style={{ fontWeight: "500" }}>
                                  {formattedDate(createdAt)}
                                </span>
                                <br />
                                {activeProject.last_updated ? (
                                  <>
                                    <Icon name='edit' />
                                    Last Updated on{" "}
                                    <span style={{ fontWeight: "500" }}>
                                      {formattedDate(lastUpdated)}
                                    </span>
                                  </>
                                ) : (
                                  <> </>
                                )}
                              </p>
                              <div style={{ marginTop: "10px" }}>
                                {activeProject.description}
                              </div>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Segment
                            className='darkBg'
                            style={{
                              fontSize: "1em",
                              width: "100%",
                            }}
                          >
                            <Header
                              as='h5'
                              style={{
                                margin: "0  0 10px 0",
                              }}
                            >
                              <Icon name='file outline' />
                              Included Models
                            </Header>
                            {limitedProjectModels.length ? (
                              <>
                                <div style={{ marginTop: "10px" }}>
                                  {findMatchingIds()}
                                </div>
                              </>
                            ) : (
                              "None"
                            )}
                          </Segment>
                        </Grid.Row>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                </Grid.Row>
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

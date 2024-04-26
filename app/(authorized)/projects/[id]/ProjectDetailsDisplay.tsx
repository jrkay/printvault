"use client"

import React, { useState } from "react"
import {
  Button,
  Grid,
  Header,
  Icon,
  Segment,
  Image,
  TabPane,
  Tab,
} from "semantic-ui-react"
import { useParams } from "next/navigation"
import {
  ImageProps,
  ModelProps,
  ProjectProps,
  ProjectModelProps,
  UserProps,
} from "@/utils/appTypes"
import Link from "next/link"
import CancelButton from "@/components/CancelButton"
import { formattedDate, truncate } from "@/utils/helpers/uiHelpers"

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
                {truncate(model.description, 100, 100)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </React.Fragment>
      ))
      return modelsToRender
    }
  }

  const panes = [
    {
      menuItem: "Details",
      render: () => (
        <TabPane
          attached={false}
          style={{
            maxHeight: "24em",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {activeProject?.description ?? "No Description"}
        </TabPane>
      ),
    },
    {
      menuItem: "Comments",
      render: () => (
        <TabPane
          attached={false}
          style={{
            maxHeight: "24em",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          <span style={{ whiteSpace: "pre-wrap" }}>
            {activeProject?.comments ?? "No Comments"}
          </span>
        </TabPane>
      ),
    },
  ]

  const TabExampleSecondaryPointing = () => (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  )

  return (
    <>
      <Grid
        centered
        largescreen={12}
        widescreen={12}
        computer={12}
        tablet={12}
        mobile={12}
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Grid.Row style={{ paddingBottom: "0px" }}>
          <Grid.Column textAlign='right'>
            {activeUser === undefined ? (
              <Button basic size='large' color='violet' disabled>
                Edit Project
              </Button>
            ) : activeProject?.user_id === activeUser ? (
              isEdit ? (
                <>
                  <CancelButton />
                </>
              ) : (
                <>
                  <Button
                    basic
                    size='large'
                    color='violet'
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Project
                  </Button>
                </>
              )
            ) : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} style={{ paddingTop: "0px" }}>
          <Grid.Column>
            <Header as='h3'>{activeProject?.name}</Header>
            {/* User Details */}
            <Grid.Row
              style={{
                display: "flex",
                marginTop: "20px",
              }}
            >
              <Grid.Column
                style={{
                  padding: "10px 5px 5px 10px",
                  alignContent: "center",
                  border: "1px solid rgb(0,0,0,.1)",
                  borderRadius: "5px 0 0 5px",
                }}
              >
                <Icon name='user circle' size='big' />
              </Grid.Column>
              <Grid.Column
                largescreen={6}
                widescreen={6}
                computer={6}
                tablet={6}
                mobile={6}
                style={{
                  padding: "5px 10px",
                  border: "1px solid rgb(0,0,0,.1)",
                  borderLeft: "none",
                  borderRadius: "0 5px 5px 0",
                }}
              >
                <div style={{ margin: "0 auto" }}>
                  {userData.length ? (
                    userData
                      .filter((user) => user.id === activeProject?.user_id)
                      .map((user) => (
                        <span
                          key={user.id}
                          style={{
                            fontSize: "1.1em",
                            fontWeight: "700",
                          }}
                        >
                          {user.username === "Guest" ? (
                            user.username
                          ) : (
                            <Link href={`/account/${user.username}`}>
                              {user.username}
                            </Link>
                          )}
                        </span>
                      ))
                  ) : (
                    <span>PrintVault User</span>
                  )}
                </div>
                <Icon name='cloud upload' />
                <span style={{ fontSize: ".9em" }}>
                  Uploaded {formattedDate(activeProject?.created_at)}
                </span>
                <span style={{ fontSize: ".9em", display: "block" }}>
                  {activeProject?.last_updated && (
                    <>
                      <Icon name='edit' />
                      Edited{" "}
                      <span style={{}}>
                        {formattedDate(activeProject?.last_updated)}
                      </span>
                    </>
                  )}
                </span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Column
              style={{
                marginTop: "10px",
                background: "#F9FAFB",
                padding: "10px",
                margin: "20px 0",
              }}
            >
              {activeProject?.status === "Started" ? (
                <>Started on {activeProject?.start_date}</>
              ) : (
                "Status: " + activeProject?.status
              )}
            </Grid.Column>
            {TabExampleSecondaryPointing()}
          </Grid.Column>
          <Grid.Column>
            <Header
              dividing
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
                <div style={{ marginTop: "10px" }}>{findMatchingIds()}</div>
              </>
            ) : (
              "None"
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

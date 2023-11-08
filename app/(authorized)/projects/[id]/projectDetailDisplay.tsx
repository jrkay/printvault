"use client"

import React, { useState, useEffect } from "react"
import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react"
import { useParams, useRouter } from "next/navigation"
import DeleteProject from "@/components/project/DeleteProject"
import { ModelData, ProjectModelData } from "@/utils/AppRoutesProps.tsx"
import Link from "next/link"
import EditProject from "@/components/project/EditProject"

export default function ProjectDetailDisplay({
  modelData,
  projectData,
  projectModelData,
}: {
  modelData: ModelData[]
  projectData: any
  projectModelData: ProjectModelData[]
}) {
  const [isEdit, setIsEdit] = useState(false)
  const router = useRouter()

  const { id } = useParams<{ id: string }>()
  const activeModel =
    modelData && modelData.find((model: any) => model.id === id)
  const activeProject = projectData.find((model: any) => model.id === id)
  const [projectModelsIds, setProjectModelsIds] = useState<string[]>([])
  const [projectModels, setProjectModels] = useState<string[]>([])

  const limitedProjectModels = projectModelData.filter(
    (row: any) => row.project_id === activeProject.id
  )

  // useEffect(() => {
  //   getModelIds()
  // }, [])

  const refresh = () => {
    window.location.reload()
  }

  const BackLink = () => {
    if (isEdit) {
      return (
        <Button
          href={`/projects/${activeProject.id}`}
          onClick={() => refresh()}
          style={{}}
          className='sideNavButton'
          compact
        >
          Cancel
        </Button>
      )
    } else {
      return <></>
    }
  }

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
    if (isEdit) {
      return <></>
    } else {
      return (
        <div style={{ fontWeight: "bold", marginTop: "20px" }}>
          {}
          <DeleteProject
            activeProject={activeProject}
            projectModelData={projectModelData}
          />
        </div>
      )
    }
  }

  // const getModelIds = () => {
  //   // Check if projectModelData exists
  //   if (projectModelData) {
  //     // Filter projectModelData to get matching rows
  //     const matchingProjectModels = projectModelData.filter(
  //       (row: any) => row.project_id === activeProject?.id
  //     )

  //     // Get model IDs from matchingProjectModels
  //     const modelIds = matchingProjectModels.map((row: any) => row.model_id)

  //     // Convert model IDs to string
  //     const mappedModelIds = modelIds.map((id: any) => id.toString())

  //     // Set projectModelsIds state with mappedModelIds
  //     //  setProjectModelsIds(mappedModelIds)

  //     // Filter modelData to get matching models based on model IDs
  //     const matchingModels = modelData
  //       .filter((row: any) =>
  //         mappedModelIds.some((modelId: any) => modelId.id === row.id)
  //       )
  //       .map((model: any) => model.name)

  //     // use mappedModelIds to search modelData

  //     console.log("matchingModels============", matchingModels)
  //     console.log("modeldata-----", modelData)
  //     console.log("!!!!!!!!!!!!!mappedModelIds-----", mappedModelIds)
  //     console.log(
  //       "TESTING----____--____--_",
  //       modelData.filter((row: any) =>
  //         mappedModelIds.some((modelId: any) => modelId.id === row.id)
  //       )
  //     )
  //     // Set projectModels state with matchingModels
  //     // setProjectModels(matchingModels)
  //     return matchingModels
  //   }
  // }

  const findMatchingIds = () => {
    let modelsToRender: JSX.Element[] = []

    if (limitedProjectModels) {
      const matchingModels = modelData.filter((row: any) =>
        limitedProjectModels.filter((modelId: any) => modelId.id === row.id)
      )

      modelsToRender = matchingModels.map(
        (model: { id: string; name: string }) => (
          <>
            <Link
              href={"/models/" + model.id}
              key={model.id}
              style={{ marginBottom: "10px", fontSize: "0.8em" }}
            >
              {model.name}
            </Link>
            <br />
          </>
        )
      )
      return modelsToRender
    }
  }

  const createdAt = activeProject?.created_at
  const lastUpdated = activeProject?.last_updated
  const formattedDate = (date: any) => {
    return new Date(date).toLocaleDateString(undefined)
  }

  return (
    console.log("projectModelData", projectModelData),
    console.log("activeProject", activeProject),
    console.log("limitedProjectModels", limitedProjectModels),
    (
      <>
        <Grid centered>
          <Grid.Row style={{}}>
            <Grid.Column
              largeScreen={2}
              widescreen={2}
              computer={2}
              tablet={2}
              mobile={14}
              className='pageContainer'
              style={{ maxWidth: "200px" }}
            >
              <Grid stackable padded style={{ padding: "50px 0 0 0" }}>
                {EditLink()}
                <br />
                {getDeleteLink()}
                <br />
                {BackLink()}
              </Grid>
            </Grid.Column>
            <Grid.Column
              largeScreen={11}
              widescreen={11}
              computer={11}
              tablet={11}
              mobile={14}
              className='pageContainer'
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
                                <p style={{ margin: "0", fontSize: ".8em" }}>
                                  <Icon name='cloud upload' />
                                  Uploaded on{" "}
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
                              style={{
                                background: "rgb(0, 0, 0, .35)",
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
                                  {projectModels.map(
                                    (model: string, index: number) => (
                                      <div
                                        key={index}
                                        style={{ marginTop: "10px" }}
                                      >
                                        <Link href={`/models/${model}`}>
                                          {findMatchingIds()}
                                        </Link>
                                      </div>
                                    )
                                  )}
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
  )
}

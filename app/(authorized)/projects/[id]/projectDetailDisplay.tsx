"use client"

import React, { useState, useEffect } from "react"
import { Button, Grid, Header } from "semantic-ui-react"
import { useParams, useRouter } from "next/navigation"
import DeleteProject from "@/components/project/DeleteProject"
import { ModelData, ProjectModelData } from "@/utils/AppRoutesProps.tsx"
import Link from "next/link"
import EditProject from "@/components/project/EditProject"

export default function ProjectDetailDisplay({
  isAdd,
  modelData,
  projectData,
  projectModelData,
}: {
  isAdd?: boolean
  modelData: ModelData[]
  projectData: any
  projectModelData: ProjectModelData[]
}) {
  const [isEdit, setIsEdit] = useState(false)
  const router = useRouter()

  const { id } = useParams<{ id: string }>()
  const activeModel =
    modelData && modelData.find((model: any) => model.id === id)
  const activeProject =
    projectData && projectData.find((model: any) => model.id === id)
  const [projectModelsIds, setProjectModelsIds] = useState<string[]>([])
  const [projectModels, setProjectModels] = useState<string[]>([])

  useEffect(() => {
    getModelIds()
  }, [])

  const refresh = () => {
    window.location.reload()
  }

  const BackLink = () => {
    if (isAdd || isEdit) {
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
    if (isAdd || isEdit) {
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
    if (isAdd || isEdit) {
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

  const getModelIds = () => {
    if (projectModelData) {
      const matchingProjectModels = projectModelData.filter(
        (row: any) => row.project_id === activeProject?.id
      )
      const modelIds = matchingProjectModels.map((row: any) => row.model_id)

      const mappedModelIds = modelIds.map((id: any) => id.toString())
      setProjectModelsIds(mappedModelIds)

      const matchingModels = modelData
        .filter((row: any) =>
          mappedModelIds.some((modelId: any) => modelId.id === row.id)
        )
        .map((model: any) => model.id)
      setProjectModels(matchingModels)
    }
  }

  const findMatchingIds = (projectModels: string): string[] => {
    const matchingIds = modelData
      .filter((row: any) => projectModels.includes(row.id))
      .map((model: any) => model.name)

    return matchingIds
  }

  return (
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
                              <div>
                                Models:
                                <br />
                                {projectModels.length ? (
                                  <>
                                    {projectModels.map(
                                      (model: string, index: number) => (
                                        <div
                                          key={index}
                                          style={{ marginTop: "10px" }}
                                        >
                                          <Link href={`/models/${model}`}>
                                            {findMatchingIds(model)}
                                          </Link>
                                        </div>
                                      )
                                    )}
                                  </>
                                ) : (
                                  "None"
                                )}
                              </div>
                            </div>
                          </Grid.Column>
                          <Grid.Column width={1}>
                            <></>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <div>
                            Description: <br />
                            {activeProject.description}
                          </div>
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

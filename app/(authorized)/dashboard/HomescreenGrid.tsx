"use client"

import React from "react"
import {
  ModelProps,
  ProjectProps,
  ProjectModelProps,
  ImageProps,
  UserProps,
} from "@/utils/appTypes"
import {
  Grid,
  Divider,
  Header,
  Card,
  Segment,
  Button,
  Table,
  Tab,
} from "semantic-ui-react"
import Link from "next/link"
import { truncate } from "@/utils/helpers/uiHelpers"
import StatCard from "./StatCard"
import NewestModelCard from "./NewestModelCard"
import Carousel from "react-multi-carousel"
import { formattedDate } from "@/utils/helpers/uiHelpers"

const HomescreenGrid = ({
  projectData,
  projectModelData,
  modelData,
  imageData,
  userData,
}: {
  projectData: ProjectProps[]
  projectModelData: ProjectModelProps[]
  modelData: ModelProps[]
  imageData: ImageProps[]
  userData: any
}) => {
  const getUserProjectsCount = (projectData: ProjectProps[]): number =>
    projectData?.length ?? 0

  const getUserModelsCount = (modelData: ModelProps[]): number =>
    modelData?.length ?? 0

  const getNewestModels = (modelData: ModelProps[]): ModelProps[] => {
    if (!modelData || modelData.length === 0) return []
    const modelDataWithLatestFirst = [...modelData].sort((a, b) =>
      b.created_at.localeCompare(a.created_at)
    )
    return modelDataWithLatestFirst.slice(0, 5)
  }
  const getProjectModels = (
    projectModelData: ProjectModelProps[],
    projectId: string
  ): string[] =>
    projectModelData
      .filter((row) => row.project_id === projectId)
      .map((row) => row.model_id)

  const getNewestProjects = (
    projectData: ProjectProps[],
    projectModelData: ProjectModelProps[]
  ): JSX.Element[] =>
    projectData
      .slice()
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 5)
      .map((project) => {
        const models = getProjectModels(projectModelData, project.id)

        return (
          <Table.Row key={project.id}>
            <Table.Cell width={2}>
              {formattedDate(project.created_at)}
            </Table.Cell>
            <Table.Cell width={6}>
              <Header as='h4'>
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </Header>
              {truncate(project.description, 150, 150)}
            </Table.Cell>
            <Table.Cell width={2}>{project.status}</Table.Cell>
            <Table.Cell width={2}>
              {project.start_date ? formattedDate(project.start_date) : ""}
            </Table.Cell>
            <Table.Cell width={1} textAlign='center'>
              {models.length ? models.length : 0}
            </Table.Cell>
          </Table.Row>
        )
      })

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1700 },
      items: 5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1700, min: 1250 },
      items: 4,
      slidesToSlide: 2,
    },
    smallDesktop: {
      breakpoint: { max: 1250, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },

    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  return (
    <>
      <Grid
        style={{
          maxWidth: "1700px",
          margin: "0 auto",
        }}
      >
        {/* Section for recent models */}
        <Grid.Row columns={2}>
          <Grid.Column textAlign='left' verticalAlign='middle'>
            <Header as='h5'>Recent Models</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            {userData ? (
              <Button
                basic
                color='violet'
                as={Link}
                href='/models/add'
                size='large'
              >
                Upload Model
              </Button>
            ) : (
              <Button
                basic
                color='violet'
                as={Link}
                href='/models/add'
                disabled
                size='large'
              >
                Upload Model
              </Button>
            )}
            <Button basic color='violet' as={Link} href='/models' size='large'>
              View All Models
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ paddingTop: "0" }}>
          <Grid.Column>
            <Carousel
              additionalTransfrom={0}
              arrows
              draggable
              infinite
              responsive={responsive}
            >
              {getNewestModels(modelData).map((model) => (
                <NewestModelCard
                  key={model.id}
                  model={model}
                  imageData={imageData}
                />
              ))}
            </Carousel>
          </Grid.Column>
        </Grid.Row>
        {/* Section for recent projects */}
        <Grid.Row columns={2} style={{ paddingTop: "80px" }}>
          <Grid.Column textAlign='left' verticalAlign='middle'>
            <Header as='h5'>Recent Projects</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            {userData ? (
              <Button
                basic
                color='violet'
                as={Link}
                href='/projects/add'
                size='large'
              >
                Create New Project
              </Button>
            ) : (
              <Button
                basic
                color='violet'
                as={Link}
                disabled
                href='/projects/add'
                size='large'
              >
                Create New Project
              </Button>
            )}
            <Button
              basic
              color='violet'
              as={Link}
              href='/projects'
              size='large'
            >
              View All Projects
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ paddingTop: "0" }}>
          <Grid.Column>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Created</Table.HeaderCell>
                  <Table.HeaderCell>Project</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Start Date</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center' singleLine>
                    Model Count
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {getNewestProjects(projectData, projectModelData)}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default HomescreenGrid

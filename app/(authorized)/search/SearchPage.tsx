"use client"

import React, { useEffect, useState } from "react"
import { Grid, Header, Icon, Image, Segment, Card } from "semantic-ui-react"
import { truncate } from "@/utils/helpers/uiHelpers"
import { ImageProps, ModelProps } from "@/utils/appTypes"
import { getImages } from "@/api/api/imageApi"

const SearchPage = ({ models, projects, search, activeUser }: any) => {
  const [modelImages, setModelImages] = useState<{
    [key: string]: ImageProps[]
  }>({})

  useEffect(() => {
    const fetchImages = async () => {
      if (activeUser) {
        const promises = models.map(async (model: ModelProps) => {
          try {
            const images = await getImages(activeUser, model.id)
            setModelImages((prevImages) => ({
              ...prevImages,
              [model.id]: images,
            }))
          } catch (error) {
            console.error("Error fetching images:", error)
          }
        })
        await Promise.all(promises)
      }
    }
    fetchImages()
  }, [models, activeUser])

  const renderImage = (model: ModelProps) => {
    const filteredImages = modelImages[model.id] || []

    if (filteredImages.length > 0) {
      const firstImage = filteredImages[0]
      return (
        <Image
          key={firstImage.id}
          alt=''
          src={firstImage.href}
          style={{
            minWidth: "100%",
            height: "250px",
            objectFit: "cover",
          }}
        />
      )
    } else {
      return (
        <span
          style={{
            padding: "100px",
            background: "rgb(0,0,0,.05)",
            textAlign: "center",
            height: "250px",
          }}
        >
          <Icon name='cube' size='huge' />
        </span>
      )
    }
  }

  return (
    <>
      <Grid centered>
        <Grid.Column
          largescreen={13}
          computer={12}
          tablet={12}
          mobile={14}
          style={{ maxWidth: "1700px" }}
        >
          <Segment padded='very'>
            <Header as='h2'>Search Results for {search.q}</Header>

            {models.length === 0 && projects.length === 0 && (
              <p>No results found</p>
            )}

            {models.length > 0 && (
              <Segment>
                <h3>Models</h3>
                <Card.Group centered>
                  {models.map((m: ModelProps) => (
                    <Card
                      key={m.id}
                      image={renderImage(m)}
                      header={m.name}
                      description={truncate(m.description, 100, 200)}
                      href={"/models/" + m.id}
                    />
                  ))}
                </Card.Group>
              </Segment>
            )}

            {projects.length > 0 && (
              <Segment>
                <h3>Projects</h3>
                {projects.map((p: any) => (
                  <Card
                    key={p.id}
                    header={p.name}
                    description={truncate(p.description, 100, 200)}
                    href={"/projects/" + p.id}
                  />
                ))}
              </Segment>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default SearchPage

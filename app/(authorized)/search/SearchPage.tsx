"use client"

import React from "react"
import { Grid, Header, Icon, Image, Segment, Card } from "semantic-ui-react"
import { truncate } from "@/utils/helpers/uiHelpers"

const SearchPage = ({ models, projects, images, search }: any) => {
  const renderImage = (model: any, images: any) => {
    const filteredImages = images.filter(
      (image: any) => image.model_id === model.id
    )

    if (filteredImages.length > 0) {
      return (
        <>
          {filteredImages.slice(0, 1).map((image: any) => (
            <Image
              key={image.id}
              alt=''
              src={image.href}
              style={{
                minWidth: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          ))}
        </>
      )
    } else {
      return (
        <p
          style={{
            padding: "100px",
            background: "rgb(0,0,0,.05)",
            textAlign: "center",
            height: "250px",
          }}
        >
          <Icon name='cube' size='huge' />
        </p>
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
          <Segment padded='very' className='darkBg'>
            <Header as='h2'>Search Results for {search.q}</Header>

            {models.length === 0 && projects.length === 0 && (
              <p>No results found</p>
            )}

            {models.length > 0 && (
              <Segment className='darkBg'>
                <h3>Models</h3>
                <Card.Group centered>
                  {models.map((m: any) => (
                    <Card
                      key={m.id}
                      image={renderImage(m, images)}
                      header={m.name}
                      description={truncate(m.description, 100, 200)}
                      href={"/models/" + m.id}
                    />
                  ))}
                </Card.Group>
              </Segment>
            )}

            {projects.length > 0 && (
              <Segment className='darkBg'>
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

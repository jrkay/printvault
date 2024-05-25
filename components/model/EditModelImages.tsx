// ModelImages.jsx
import React from "react"
import { Icon, Card, Image, Segment, Header } from "semantic-ui-react"
import ImageUpload from "@/components/image/ImageUpload"
import ImageDelete from "@/components/image/ImageDelete"
import { ImageProps } from "@/utils/appTypes"

const ModelImages = ({
  activeModel,
  imageData,
  activeUser,
}: {
  activeModel: any
  imageData: ImageProps[]
  activeUser?: string
}) => {
  const filteredImages = imageData.filter(
    (image: ImageProps) => image.model_id === activeModel.id
  )

  const renderImages = () => {
    if (filteredImages.length > 0) {
      return filteredImages.map((image: ImageProps) => (
        <Card
          key={image.id}
          style={{
            background: "rgb(0,0,0,.05)",
            boxShadow: "none",
            margin: "10px",
          }}
        >
          <Image
            key={image.id}
            alt=''
            src={image.href}
            style={{ margin: "10px" }}
          />
          <Card.Content style={{ padding: "0 0 10px 0" }}>
            <ImageDelete
              image={image}
              activeUser={activeUser}
              modalDisplay={
                <Icon
                  name='minus square outline'
                  style={{ cursor: "pointer", width: "100%" }}
                  size='large'
                />
              }
            />
          </Card.Content>
        </Card>
      ))
    } else {
      return (
        <p
          style={{
            padding: "70px",
            background: "rgb(0,0,0,.05)",
            textAlign: "center",
          }}
        >
          <Icon name='cube' size='huge' />
        </p>
      )
    }
  }

  return (
    <Segment color='violet' padded='very'>
      <Header as='h4'>
        Model Images ({filteredImages.length})
        <br />
        <ImageUpload
          activeModel={activeModel}
          activeUser={activeUser}
          modalDisplay={
            <Icon
              name='plus square outline'
              style={{ cursor: "pointer", padding: "0" }}
              size='large'
            />
          }
        />
      </Header>
      <div style={{ display: "flex" }}>{renderImages()}</div>
    </Segment>
  )
}

export default ModelImages

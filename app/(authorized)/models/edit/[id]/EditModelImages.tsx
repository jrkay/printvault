import React from "react"
import { Icon, Card, Image, Segment, Header } from "semantic-ui-react"
import ImageUpload from "@/components/image/ImageUpload"
import ImageDelete from "@/components/image/ImageDelete"
import { ImageProps } from "@/utils/appTypes"
import { User } from "@supabase/supabase-js"

const EditModelImages = ({
  activeModel,
  imageData,
  activeUser,
  onImageDataChange,
}: {
  activeModel: any
  imageData: ImageProps[]
  activeUser: User
  onImageDataChange: any
}) => {
  const renderImages = () => {
    if (imageData.length > 0) {
      return imageData.map((image: ImageProps) => (
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
              onImageDelete={onImageDataChange}
            />
          </Card.Content>
        </Card>
      ))
    } else {
      return <p>No Images Available</p>
    }
  }

  return (
    <Segment color='violet' padded='very'>
      <Header as='h4'>
        Model Images ({imageData.length})
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
          onImageUpload={onImageDataChange}
        />
      </Header>
      <div style={{ display: "flex" }}>{renderImages()}</div>
    </Segment>
  )
}

export default EditModelImages

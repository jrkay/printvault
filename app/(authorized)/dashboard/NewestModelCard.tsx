import React from "react"
import { Card, Icon, Image } from "semantic-ui-react"
import { truncate } from "@/utils/helpers/uiHelpers"
import { ModelProps, ImageProps } from "@/utils/appTypes"

const NewestModelCard = ({
  model,
  imageData,
}: {
  model: ModelProps
  imageData: ImageProps[]
}) => {
  const renderImage = (model: ModelProps) => {
    const filteredImages = imageData.filter(
      (image: ImageProps) => image.model_id === model.id
    )

    if (filteredImages.length > 0) {
      return (
        <>
          {filteredImages.slice(0, 1).map((image: ImageProps) => (
            <Image
              key={image.id}
              alt=''
              src={image.href}
              fluid
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
            padding: "115px",
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
    <Card
      image={renderImage(model)}
      header={model.name}
      description={truncate(model.description, 100, 200)}
      key={model.id}
      href={"/models/" + model.id}
      style={{ fontSize: "14px", margin: "10px !important" }}
    />
  )
}

export default NewestModelCard

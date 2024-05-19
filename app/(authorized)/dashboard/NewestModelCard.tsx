import React from "react"
import { Card, Icon, Image } from "semantic-ui-react"
import { formatDateMonth, truncate } from "@/utils/helpers/uiHelpers"
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

  const description = <>{"Created on " + formatDateMonth(model.created_at)}</>

  const header = (model: ModelProps) => {
    return (
      <>
        <div style={{ fontSize: "1.1em", fontWeight: "500" }}>
          {truncate(model.name, 35, 35)}
        </div>
      </>
    )
  }

  return (
    <Card
      image={renderImage(model)}
      header={header(model)}
      description={description}
      key={model.id}
      href={"/models/" + model.id}
      style={{ fontSize: ".9em" }}
    />
  )
}

export default NewestModelCard

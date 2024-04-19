import React from "react"
import { Card, Icon, Image } from "semantic-ui-react"
import { truncate } from "@/utils/helpers/uiHelpers"
import { ModelProps, ImageProps } from "@/utils/appTypes"
import { getPrintJobs } from "@/api/api/printJobApi"

const NewestModelCard = ({
  model,
  imageData,
}: {
  model: ModelProps
  imageData: ImageProps[]
}) => {
  // Get print jobs
  const printJobCount = getPrintJobs(model.id)

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    // Get month name
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sepr",
      "Oct",
      "Nov",
      "Dec",
    ]
    const monthName = monthNames[date.getMonth()]
    // Get day of the month
    const day = date.getDate()
    // Get full year
    const year = date.getFullYear()

    return `${monthName} ${day}, ${year}`
  }

  const description = <>{"Created on " + formatDate(model.created_at)}</>

  return (
    <Card
      image={renderImage(model)}
      header={model.name}
      description={description}
      key={model.id}
      href={"/models/" + model.id}
      style={{ fontSize: "14px" }}
    />
  )
}

export default NewestModelCard

import React, { useEffect, useState } from "react"
import { Card, Icon, Image } from "semantic-ui-react"
import { formatDateMonth, truncate } from "@/utils/helpers/uiHelpers"
import { ModelProps, ImageProps } from "@/utils/appTypes"
import { getImages } from "@/api/api/imageApi"
import { User } from "@supabase/supabase-js"

const NewestModelCard = ({
  model,
  activeUser,
}: {
  model: ModelProps
  activeUser: User | null
}) => {
  const [firstImage, setFirstImage] = useState<ImageProps | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      if (activeUser) {
        try {
          const images = await getImages(activeUser, model.id)
          if (images.length > 0) {
            setFirstImage(images[0])
          }
        } catch (error) {
          console.error("Error fetching images:", error)
        }
      }
    }

    fetchImages()
  }, [activeUser, model.id])

  const renderFirstImage = () => {
    if (firstImage) {
      return (
        <Image
          key={firstImage.id}
          alt={model.name}
          src={firstImage.href}
          fluid
          style={{
            minWidth: "100%",
            maxHeight: "250px",
            objectFit: "cover",
            borderRadius: "5px 5px 0 0",
          }}
        />
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

  const header = () => {
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
      image={renderFirstImage()}
      header={header()}
      description={description}
      href={"/models/" + model.id}
      style={{ fontSize: ".9em" }}
    />
  )
}

export default NewestModelCard

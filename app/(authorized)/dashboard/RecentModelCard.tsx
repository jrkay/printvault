import React from "react"
import { Card, Image } from "semantic-ui-react"
import { truncate } from "@/utils/const"

const RecentModelCard = ({ model, renderImage }) => {
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

export default RecentModelCard

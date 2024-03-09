import React from "react"
import { Card } from "semantic-ui-react"
import Link from "next/link"

const StatCard = ({ title, count, href }) => (
  <Card style={{ border: "1px solid purple", boxShadow: "none" }} href={href}>
    <Card.Content>
      <Card.Header>{count}</Card.Header>
      <Card.Description>{title}</Card.Description>
    </Card.Content>
  </Card>
)

export default StatCard

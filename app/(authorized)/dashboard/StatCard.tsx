import React from "react"
import { Card } from "semantic-ui-react"
import { StatCardProps } from "@/utils/appTypes"

const StatCard = ({ title, count, href }: StatCardProps) => (
  <Card className='stat-card' href={href}>
    <Card.Content>
      <Card.Header>{count}</Card.Header>
      <Card.Description>{title}</Card.Description>
    </Card.Content>
  </Card>
)

export default StatCard

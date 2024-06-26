import { Loader } from "semantic-ui-react"

export default function Loading() {
  return (
    <Loader
      active
      inline='centered'
      size='large'
      content='Loading...'
      style={{ marginTop: "5rem" }}
    />
  )
}

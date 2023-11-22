"use client"

import React from "react"
import { Button } from "semantic-ui-react"

const refresh = () => {
  window.location.reload()
}

const CancelButton = () => {
  return (
    <Button
      basic
      color='violet'
      content='Cancel'
      href={`/projects/`}
      onClick={() => refresh()}
      className='sideNavButton'
      compact
    />
  )
}

export default CancelButton

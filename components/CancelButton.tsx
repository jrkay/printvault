"use client"

import React from "react"
import { Button } from "semantic-ui-react"
import { refresh } from "@/utils/helpers/uiHelpers"

const CancelButton = () => {
  return (
    <Button
      basic
      color='violet'
      content='Cancel'
      onClick={() => {
        window.history.back() // Navigate to the previous page
        refresh()
      }}
      className='sideNavButton'
      compact
    />
  )
}

export default CancelButton

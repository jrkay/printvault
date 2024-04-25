"use client"

import React from "react"
import { Button } from "semantic-ui-react"
import { refresh } from "@/utils/helpers/uiHelpers"

const CancelButton = () => {
  return (
    <Button
      basic
      size='large'
      color='violet'
      onClick={() => {
        window.history.back()
        refresh()
      }}
    >
      Cancel
    </Button>
  )
}

export default CancelButton

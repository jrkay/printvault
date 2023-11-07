import React from "react"
import { render } from "@testing-library/react"
import ModelListDisplay from "@/app/(authorized)/models/modelListDisplay"
import { v4 as uuidv4 } from "uuid"

test("renders ModelListDisplay component correctly", async () => {
  const modelData = [
    {
      id: uuidv4.toString(),
      name: "Model 1",
      description: "This is model 1",
      type: "Type 1",
      license: "License 1",
      url: "URL 1",
      user_id: "User 1",
      created_at: new Date().toString(),
    },
    {
      id: uuidv4.toString(),
      name: "Model 2",
      description: "This is model 2",
      type: "Type 2",
      license: "License 2",
      url: "URL 2",
      user_id: "User 1",
      created_at: new Date().toString(),
    },
  ]
  const imageData: string[] = []

  const { getByText } = render(
    <ModelListDisplay
      modelData={modelData}
      imageData={imageData}
      activeUser={"User 1"}
    />
  )

  await expect(getByText("Model 1")).toBeInTheDocument()
  await expect(getByText("Model 2")).toBeInTheDocument()
})

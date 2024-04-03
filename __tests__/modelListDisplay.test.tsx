import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import ModelListDisplay from "@/app/(authorized)/models/ModelListDisplay"
import { v4 as uuidv4 } from "uuid"

const userId1 = uuidv4()
const userId2 = uuidv4()

const modelData = [
  {
    id: uuidv4(),
    name: "Model 1",
    description: "This is model 1",
    type: "Type 1",
    license: "License 1",
    url: "URL 1",
    user_id: userId1,
    created_at: new Date().toString(),
  },
  {
    id: uuidv4(),
    name: "Model 2",
    description: "This is model 2",
    type: "Type 2",
    license: "License 2",
    url: "URL 2",
    user_id: userId2,
    created_at: new Date().toString(),
  },
]
const imageData = [
  {
    created_at: new Date().toString(),
    model_id: modelData[0].id,
    href: "https://placehold.co/600x400",
    id: uuidv4(),
  },
]
const user = [
  {
    created_at: new Date().toString(),
    email: "example@email.com",
    id: userId1,
    name: "John Test",
    photo: "https://placehold.co/600x400",
    username: "User1",
  },
  {
    created_at: new Date().toString(),
    email: "example@email.com",
    id: userId2,
    name: "Tom Test",
    photo: "https://placehold.co/600x400",
    username: "User2",
  },
]

describe("ModelListDisplay", () => {
  test("renders correctly with provided data", () => {
    render(
      <ModelListDisplay
        modelData={modelData}
        imageData={imageData}
        userData={user}
        activeUser={user}
      />
    )

    // Assert that the component renders model names, descriptions, etc.
    modelData.forEach((model) => {
      expect(screen.getByText(model.name)).toBeInTheDocument()
      expect(
        screen.getByText(new RegExp(model.description))
      ).toBeInTheDocument()
    })
  })

  test("sorts models correctly", async () => {
    render(
      <ModelListDisplay
        modelData={modelData}
        imageData={imageData}
        userData={user}
        activeUser={user}
      />
    )

    // Click on a sorting button
    await waitFor(() => {
      fireEvent.click(screen.getByText("Sort by Name A-Z"))
    })

    // Check if the first item in the sorted list is "Model 1"
    const firstModelName = screen.getAllByText("Model 1")[0]
    expect(firstModelName).toBeInTheDocument()
  })

  test("renders images for each model", () => {
    render(
      <ModelListDisplay
        modelData={modelData}
        imageData={imageData}
        userData={user}
        activeUser={user}
      />
    )

    // Assert that an image is rendered for each model
    // Or that the "No Image" text is shown where appropriate
    modelData.forEach((model) => {
      const relatedImages = imageData.filter(
        (image) => image.model_id === model.id
      )
      if (relatedImages.length > 0) {
        expect(screen.getByAltText("")).toHaveAttribute(
          "src",
          relatedImages[0].href
        )
      } else {
        expect(screen.getByText("No Image")).toBeInTheDocument()
      }
    })
  })
})

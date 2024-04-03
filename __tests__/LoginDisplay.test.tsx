import React from "react"
import { render, screen } from "@testing-library/react"
import LoginDisplay from "@/app/(unauthorized)/LoginDisplay"

test("renders app/page.tsx component with form", () => {
  render(<LoginDisplay />)

  // Check if the login form is rendered
  expect(screen.getByText("Submit")).toBeInTheDocument()
  expect(screen.getByText("Forgot Password?")).toBeInTheDocument()

  // Check if the button is rendered
  const button = screen.getByRole("button", { name: "Submit" })

  expect(button).toBeInTheDocument()
  expect(button).not.toBeDisabled()
})

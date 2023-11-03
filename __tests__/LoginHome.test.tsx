import React from "react"
import { render, screen } from "@testing-library/react"
import LoginHome from "@/components/LoginHome"

test("renders LoginHome component with form", () => {
  render(<LoginHome />)

  // Check if the login form is rendered
  expect(screen.getByText("Submit")).toBeInTheDocument()
  expect(screen.getByText("Forgot Password?")).toBeInTheDocument()
})

import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import ShareButton from "@/components/ShareButton"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Mock the createClientComponentClient function
jest.mock("@supabase/auth-helpers-nextjs", () => ({
  createClientComponentClient: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest
      .fn()
      .mockResolvedValue({ data: null, error: { message: "User not found" } }), // Adjust as needed for your tests
    update: jest.fn().mockReturnThis(),
  })),
}))

describe("ShareButton", () => {
  const mockActiveProject = { id: "proj-123", name: "Project 1" }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders with input and button", () => {
    render(<ShareButton activeProject={mockActiveProject} />)
    expect(
      screen.getByPlaceholderText("Enter user's email")
    ).toBeInTheDocument()
    expect(screen.getByText("Share Project")).toBeInTheDocument()
  })

  test("allows email input to be filled", () => {
    render(<ShareButton activeProject={mockActiveProject} />)
    const input = screen.getByPlaceholderText("Enter user's email")
    fireEvent.change(input, { target: { value: "test@example.com" } })

    expect((input as HTMLInputElement).value).toBe("test@example.com")
  })

  test("displays appropriate message when user is not found", async () => {
    render(<ShareButton activeProject={mockActiveProject} />)
    fireEvent.change(screen.getByPlaceholderText("Enter user's email"), {
      target: { value: "test@example.com" },
    })
    fireEvent.click(screen.getByText("Share Project"))

    await waitFor(() => {
      expect(screen.getByText("User not found!")).toBeInTheDocument()
    })
  })
})

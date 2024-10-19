import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import RandomUser from "../RandomUser";

//jest-dom is a companion library for Testing Library that provides custom DOM element matchers for Jest
/*
  toBeInTheDocument, toBeEmptyDOMElement, toBeVisible
  List of all available matchers: https://github.com/testing-library/jest-dom/blob/main/README.md#table-of-contents
*/

// Mock axios
jest.mock("axios");

test("fetches and displays user data", async () => {
  // Mock the API response

  //jest.fn().mockImplementation(() => Promise.resolve(value));
  axios.get.mockResolvedValue({
    data: {
      results: [
        {
          name: { first: "John", last: "Doe" },
          email: "john.doe@example.com",
        },
      ],
    },
  });

  // Render the component
  render(<RandomUser />);

  // Check for loading state
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // Wait for the user data to be displayed
  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email: john.doe@example.com")).toBeInTheDocument();
  });

  // Verify that the API was called correctly
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith("https://randomuser.me/api");
});

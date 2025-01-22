// import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";

describe("CSV Analyzer App", () => {
  test("renders the file input and header", () => {
    render(<App />);
    expect(screen.getByText(/CSV Analyser/i)).toBeInTheDocument();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
  });

  test("processes and displays CSV analysis results", async () => {
    render(<App />);

    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const csvData = new Blob(["Name, Age\nAlice, 25\nBob, 30"], {
      type: "text/csv",
    });
    const file = new File([csvData], "test.csv", { type: "text/csv" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("test.csv")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Age")).toBeInTheDocument();
    });
  });

  test("persists analysis results in localStorage", async () => {
    render(<App />);

    const fileInput = screen.getByLabelText(/file/i) as HTMLInputElement;
    const csvData = new Blob(["Name, Age\nAlice, 25\nBob, 30"], {
      type: "text/csv",
    });
    const file = new File([csvData], "test.csv", { type: "text/csv" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(localStorage.getItem("analysisResults")).toContain("test.csv");
    });
  });

  test("deletes an analysis result", async () => {
    render(<App />);

    const fileInput = screen.getByLabelText(/file/i) as HTMLInputElement;
    const csvData = new Blob(["Name, Age\nAlice, 25\nBob, 30"], {
      type: "text/csv",
    });
    const file = new File([csvData], "test.csv", { type: "text/csv" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() =>
      expect(screen.getByText("test.csv")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText(/delete/i));

    await waitFor(() =>
      expect(screen.queryByText("test.csv")).not.toBeInTheDocument()
    );
  });
});

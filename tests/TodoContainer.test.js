import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoContainer from "../src/app/components/TodoContainer";

describe("TodoContainer Component", () => {
  beforeEach(() => {
    // Clear localStorage mock between tests
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders with initial state", () => {
    render(<TodoContainer />);
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByText("Add Category")).toBeInTheDocument();
    expect(screen.getByText("Filter by Category:")).toBeInTheDocument();
  });

  it("adds a new todo", () => {
    render(<TodoContainer />);
    const addTaskInput = screen.getByPlaceholderText("Add Task...");
    const addTaskButton = screen.getByText("Add Task");

    fireEvent.change(addTaskInput, { target: { value: "New Task" } });
    fireEvent.click(addTaskButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("toggles todo completion", () => {
    render(<TodoContainer />);
    const addTaskInput = screen.getByPlaceholderText("Add Task...");
    const addTaskButton = screen.getByText("Add Task");

    fireEvent.change(addTaskInput, { target: { value: "Complete Me" } });
    fireEvent.click(addTaskButton);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("updates a todo category", () => {
    render(<TodoContainer />);
    const addTaskInput = screen.getByPlaceholderText("Add Task...");
    const addTaskButton = screen.getByText("Add Task");
    const newCategoryInput = screen.getByPlaceholderText("New Category");
    const addCategoryButton = screen.getByText("Add Category");

    fireEvent.change(addTaskInput, { target: { value: "Categorize Me" } });
    fireEvent.click(addTaskButton);

    fireEvent.change(newCategoryInput, { target: { value: "Fitness" } });
    fireEvent.click(addCategoryButton);

    const categorySelect = screen.getByLabelText("Category:");
    fireEvent.change(categorySelect, { target: { value: "Fitness" } });

    expect(categorySelect.value).toBe("Fitness");
  });

  it("filters todos by category", () => {
    render(<TodoContainer />);
    const addTaskInput = screen.getByPlaceholderText("Add Task...");
    const addTaskButton = screen.getByText("Add Task");

    // Add todos with different categories
    fireEvent.change(addTaskInput, { target: { value: "Work Task" } });
    fireEvent.click(addTaskButton);

    fireEvent.change(addTaskInput, { target: { value: "Personal Task" } });
    fireEvent.click(addTaskButton);

    const categoryFilter = screen.getByLabelText("Filter by Category:");
    fireEvent.change(categoryFilter, { target: { value: "Work" } });

    expect(screen.getByText("Work Task")).toBeInTheDocument();
  });

  it("saves todos to localStorage", () => {
    render(<TodoContainer />);
    const addTaskInput = screen.getByPlaceholderText("Add Task...");
    const addTaskButton = screen.getByText("Add Task");

    fireEvent.change(addTaskInput, { target: { value: "Save Me" } });
    fireEvent.click(addTaskButton);

    expect(localStorage.getItem("todos")).toContain("Save Me");
  });

  it("loads todos from localStorage", () => {
    const todos = JSON.stringify([
      { id: "1", title: "Stored Task", completed: false },
    ]);
    localStorage.setItem("todos", todos);

    render(<TodoContainer />);

    expect(screen.getByText("Stored Task")).toBeInTheDocument();
  });
});

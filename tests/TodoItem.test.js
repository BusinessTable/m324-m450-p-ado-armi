import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoItem from "../src/app/components/TodoItem";

describe("TodoItem Component", () => {
  const mockTodo = {
    id: "1",
    title: "Test Task",
    completed: false,
    priority: "medium",
    category: "Work",
    dueDate: new Date(Date.now() + 25 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // Due in 25 hours
  };

  const mockCategories = ["Work", "Personal", "Shopping"];
  const handleChangeProps = jest.fn();
  const deleteTodoProps = jest.fn();
  const setUpdate = jest.fn();
  const updateCategoryProps = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the todo item with correct details", () => {
    render(
      <TodoItem
        todo={mockTodo}
        categories={mockCategories}
        handleChangeProps={handleChangeProps}
        deleteTodoProps={deleteTodoProps}
        setUpdate={setUpdate}
        updateCategoryProps={updateCategoryProps}
      />
    );

    // Check rendering of title, priority, and due date
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText(/Prio: \(medium\)/i)).toBeInTheDocument();
    expect(screen.getByText(`Due: ${mockTodo.dueDate}`)).toBeInTheDocument();

    // Check category select
    const categoryDropdown = screen.getByLabelText("Category:");
    expect(categoryDropdown).toBeInTheDocument();
    expect(categoryDropdown.value).toBe("Work");

    // Check the delete button
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
  });

  it("marks the task as completed when checkbox is toggled", () => {
    render(
      <TodoItem
        todo={mockTodo}
        categories={mockCategories}
        handleChangeProps={handleChangeProps}
        deleteTodoProps={deleteTodoProps}
        setUpdate={setUpdate}
        updateCategoryProps={updateCategoryProps}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Verify the callback is called with the correct ID
    expect(handleChangeProps).toHaveBeenCalledWith(mockTodo.id);
  });

  it("deletes the task when delete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        categories={mockCategories}
        handleChangeProps={handleChangeProps}
        deleteTodoProps={deleteTodoProps}
        setUpdate={setUpdate}
        updateCategoryProps={updateCategoryProps}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "" });
    fireEvent.click(deleteButton);

    // Verify the callback is called with the correct ID
    expect(deleteTodoProps).toHaveBeenCalledWith(mockTodo.id);
  });

  it("allows editing the task title", () => {
    render(
      <TodoItem
        todo={mockTodo}
        categories={mockCategories}
        handleChangeProps={handleChangeProps}
        deleteTodoProps={deleteTodoProps}
        setUpdate={setUpdate}
        updateCategoryProps={updateCategoryProps}
      />
    );

    // Double-click to enable editing
    fireEvent.doubleClick(screen.getByText("Test Task"));
    const textInput = screen.getByRole("textbox");
    expect(textInput).toBeInTheDocument();

    // Simulate typing a new title
    fireEvent.change(textInput, { target: { value: "Updated Task" } });
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter" });

    // Verify the callback is called with the updated title
    expect(setUpdate).toHaveBeenCalledWith("Updated Task", mockTodo.id);
  });

  it("changes the category of the task", () => {
    render(
      <TodoItem
        todo={mockTodo}
        categories={mockCategories}
        handleChangeProps={handleChangeProps}
        deleteTodoProps={deleteTodoProps}
        setUpdate={setUpdate}
        updateCategoryProps={updateCategoryProps}
      />
    );

    const categoryDropdown = screen.getByLabelText("Category:");
    fireEvent.change(categoryDropdown, { target: { value: "Personal" } });

    // Verify the callback is called with the updated category
    expect(updateCategoryProps).toHaveBeenCalledWith(mockTodo.id, "Personal");
  });

  it("highlights tasks that are due soon", () => {
    const soonDueDate = new Date(Date.now() + 23 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]; // Due in 23 hours
    render(
      <TodoItem
        todo={{ ...mockTodo, dueDate: soonDueDate }}
        categories={mockCategories}
        handleChangeProps={handleChangeProps}
        deleteTodoProps={deleteTodoProps}
        setUpdate={setUpdate}
        updateCategoryProps={updateCategoryProps}
      />
    );

    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveStyle({ backgroundColor: "#ffe6e6" });
  });

  it("does not highlight tasks that are not due soon", () => {
    const farDueDate = new Date(Date.now() + 48 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]; // Due in 48 hours
    render(
      <TodoItem
        todo={{ ...mockTodo, dueDate: farDueDate }}
        categories={mockCategories}
        handleChangeProps={handleChangeProps}
        deleteTodoProps={deleteTodoProps}
        setUpdate={setUpdate}
        updateCategoryProps={updateCategoryProps}
      />
    );

    const listItem = screen.getByRole("listitem");
    expect(listItem).not.toHaveStyle({ backgroundColor: "#ffe6e6" });
  });
});

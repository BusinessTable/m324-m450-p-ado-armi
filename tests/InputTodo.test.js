import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputTodo from "../src/app/components/InputTodo";

describe("InputTodo Component", () => {
  let addTodoProps;
  let addCategoryProps;
  let categories;

  beforeEach(() => {
    addTodoProps = jest.fn(); // Mock function for adding todos
    addCategoryProps = jest.fn(); // Mock function for adding categories
    categories = ["Work", "Personal", "Shopping"]; // Default categories
  });

  it("renders input fields and buttons correctly", () => {
    render(
      <InputTodo
        addTodoProps={addTodoProps}
        addCategoryProps={addCategoryProps}
        categories={categories}
      />
    );

    // Check if input fields and buttons are rendered
    expect(screen.getByPlaceholderText("Add Task...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("New Category")).toBeInTheDocument();
    expect(screen.getByText("Add Category")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("does not add a task when the input is empty", () => {
    render(
      <InputTodo
        addTodoProps={addTodoProps}
        addCategoryProps={addCategoryProps}
        categories={categories}
      />
    );

    // Simulate clicking "Add Task" without entering a task
    fireEvent.click(screen.getByText("Add Task"));

    // Verify the mock function was not called
    expect(addTodoProps).not.toHaveBeenCalled();
  });

  it("allows adding a new category", () => {
    render(
      <InputTodo
        addTodoProps={addTodoProps}
        addCategoryProps={addCategoryProps}
        categories={categories}
      />
    );

    // Simulate user input for a new category
    fireEvent.change(screen.getByPlaceholderText("New Category"), {
      target: { value: "Fitness" },
    });

    // Simulate clicking "Add Category"
    fireEvent.click(screen.getByText("Add Category"));

    // Verify the mock function was called with the correct value
    expect(addCategoryProps).toHaveBeenCalledWith("Fitness");
  });

  it("does not add a category when the input is empty", () => {
    render(
      <InputTodo
        addTodoProps={addTodoProps}
        addCategoryProps={addCategoryProps}
        categories={categories}
      />
    );

    // Simulate clicking "Add Category" without entering a category
    fireEvent.click(screen.getByText("Add Category"));

    // Verify the mock function was not called
    expect(addCategoryProps).not.toHaveBeenCalled();
  });

  it("renders category options dynamically", () => {
    render(
      <InputTodo
        addTodoProps={addTodoProps}
        addCategoryProps={addCategoryProps}
        categories={categories}
      />
    );

    // Verify that categories are displayed as dropdown options
    categories.forEach((category) => {
      expect(
        screen.getByRole("option", { name: category })
      ).toBeInTheDocument();
    });
  });
});

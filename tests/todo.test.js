import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from "@testing-library/react";
import TodoContainer from "../src/app/components/TodoContainer";

jest.setTimeout(10000); // Set timeout to 10 seconds

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();
Object.defineProperty(global, "localStorage", { value: localStorageMock });

// Mock data
const initialTodos = [
  { id: "1", title: "Einkaufen", completed: false, priority: "medium" },
  { id: "2", title: "Test", completed: false, priority: "high" },
];

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(initialTodos));
});

describe("TodoContainer component", () => {
  test("TC1-1: Create a task with a priority", async () => {
    render(<TodoContainer />);

    // Add a new task with priority "low"
    const inputField = screen.getByPlaceholderText("Add Task...");
    const prioritySelect = screen.getByRole("combobox");
    const submitButton = screen.getByText("Add");

    fireEvent.change(inputField, { target: { value: "Work" } });
    fireEvent.change(prioritySelect, { target: { value: "low" } });
    fireEvent.click(submitButton);

    // Ensure new task appears in the list
    const newTask = await screen.findByText("Work");
    expect(newTask).toBeInTheDocument();

    // Check if the priority was saved correctly
    const todos = JSON.parse(localStorage.getItem("todos"));
    const newTodo = todos.find((todo) => todo.title === "Work");
    expect(newTodo.priority).toBe("low");
  });

  test("TC1-2: Display priority in task list", async () => {
    render(<TodoContainer />);

    // Check if priority "medium" is displayed correctly
    const todoItem = await screen.findByText("Einkaufen");
    expect(todoItem).toBeInTheDocument();
    const select = screen.getByRole("combobox");
    const currentPriority = select.value;
    expect(currentPriority).toBe("medium");
  });

  test("TC1-4: Sort tasks by priority", async () => {
    render(<TodoContainer />);

    // Ensure tasks are sorted by priority
    const todoItems = await screen.findAllByRole("listitem");
    const taskTitles = todoItems.map((item) => item.textContent);

    // "Test" with priority "high" should come before "Einkaufen" with priority "medium"
    expect(taskTitles[0]).toBe("Test");
    expect(taskTitles[1]).toBe("Einkaufen");
  });
});


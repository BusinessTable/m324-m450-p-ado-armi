// sortTodosByPriority.test.js
// sortTodosByPriority.js (Hilfsfunktion)
export const sortTodosByPriority = (todos) => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

describe('sortTodosByPriority', () => {
  it('should sort todos by priority (high, medium, low)', () => {
    const todos = [
      { id: 1, title: 'Todo 1', priority: 'low' },
      { id: 2, title: 'Todo 2', priority: 'high' },
      { id: 3, title: 'Todo 3', priority: 'medium' },
      { id: 4, title: 'Todo 4', priority: 'low' },
    ];

    const sortedTodos = sortTodosByPriority(todos);

    expect(sortedTodos).toEqual([
      { id: 2, title: 'Todo 2', priority: 'high' },
      { id: 3, title: 'Todo 3', priority: 'medium' },
      { id: 1, title: 'Todo 1', priority: 'low' },
      { id: 4, title: 'Todo 4', priority: 'low' },
    ]);
  });

  it('should not modify the original todos array', () => {
    const todos = [
      { id: 1, title: 'Todo 1', priority: 'low' },
      { id: 2, title: 'Todo 2', priority: 'high' },
    ];

    const todosCopy = [...todos];
    sortTodosByPriority(todos);

    expect(todos).toEqual(todosCopy);
  });

  it('should handle an empty array', () => {
    const todos = [];
    const sortedTodos = sortTodosByPriority(todos);

    expect(sortedTodos).toEqual([]);
  });

  it('should handle todos with the same priority', () => {
    const todos = [
      { id: 1, title: 'Todo 1', priority: 'medium' },
      { id: 2, title: 'Todo 2', priority: 'medium' },
    ];

    const sortedTodos = sortTodosByPriority(todos);

    expect(sortedTodos).toEqual([
      { id: 1, title: 'Todo 1', priority: 'medium' },
      { id: 2, title: 'Todo 2', priority: 'medium' },
    ]);
  });

});

// Mock implementation for useState and required variables
let selectedCategory = "All";
let todos = [];

const setSelectedCategory = (category) => {
  selectedCategory = category;
};

const setTodos = (newTodos) => {
  todos = newTodos;
};

const filterTodosByCategory = () => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  // Filter by category
  const filteredTodos =
    selectedCategory === "All"
      ? todos
      : todos.filter((todo) => todo.category === selectedCategory);

  // Sort by due date and priority
  return filteredTodos.sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();

    if (!isNaN(dateA) && !isNaN(dateB)) {
      return dateA - dateB; // Earlier due dates first
    }

    if (!isNaN(dateA)) return -1; // Tasks with due dates first
    if (!isNaN(dateB)) return 1;

    return priorityOrder[a.priority] - priorityOrder[b.priority]; // Sort by priority
  });
};

describe("filterTodosByCategory", () => {
  let selectedCategory = "All";
  let todos = [];

  const filterTodosByCategory = () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };

    // Filter by category
    const filteredTodos =
      selectedCategory === "All"
        ? todos
        : todos.filter((todo) => todo.category === selectedCategory);

    // Sort by due date and priority
    return filteredTodos.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      if (!isNaN(dateA) && !isNaN(dateB)) {
        return dateA - dateB; // Earlier due dates first
      }

      if (!isNaN(dateA)) return -1; // Tasks with due dates first
      if (!isNaN(dateB)) return 1;

      return priorityOrder[a.priority] - priorityOrder[b.priority]; // Sort by priority
    });
  };

  beforeEach(() => {
    selectedCategory = "All";
    todos = [
      { id: 1, title: "Task A", category: "Work", priority: "high", dueDate: "2025-01-10" },
      { id: 2, title: "Task B", category: "Personal", priority: "medium", dueDate: "2025-01-12" },
      { id: 3, title: "Task C", category: "Work", priority: "low", dueDate: "2025-01-11" },
      { id: 4, title: "Task D", category: "Personal", priority: "high", dueDate: "" }, // No due date
    ];
  });

  it("returns all todos when selectedCategory is 'All'", () => {
    const result = filterTodosByCategory();
    expect(result).toHaveLength(4);
  });

  it("filters todos by selected category", () => {
    selectedCategory = "Work";
    const result = filterTodosByCategory();
    expect(result).toHaveLength(2);
    expect(result.every((todo) => todo.category === "Work")).toBe(true);
  });

  it("sorts todos by due date within the category", () => {
    selectedCategory = "Work";
    const result = filterTodosByCategory();
    expect(result[0].title).toBe("Task A"); // Earliest due date
    expect(result[1].title).toBe("Task C");
  });

  it("places todos without due dates after those with due dates", () => {
    selectedCategory = "Personal";
    const result = filterTodosByCategory();
    expect(result[0].title).toBe("Task B"); // Has a due date
    expect(result[1].title).toBe("Task D"); // No due date
  });

  it("sorts todos by priority when due dates are the same or missing", () => {
    todos = [
      { id: 1, title: "Task A", category: "Work", priority: "medium", dueDate: "" },
      { id: 2, title: "Task B", category: "Work", priority: "high", dueDate: "" },
      { id: 3, title: "Task C", category: "Work", priority: "low", dueDate: "" },
    ];
    selectedCategory = "Work";
    const result = filterTodosByCategory();
    expect(result[0].priority).toBe("high");
    expect(result[1].priority).toBe("medium");
    expect(result[2].priority).toBe("low");
  });

  it("returns an empty array when no todos match the selected category", () => {
    selectedCategory = "Shopping";
    const result = filterTodosByCategory();
    expect(result).toHaveLength(0);
  });

  it("handles an empty todos array", () => {
    todos = [];
    const result = filterTodosByCategory();
    expect(result).toEqual([]);
  });
});


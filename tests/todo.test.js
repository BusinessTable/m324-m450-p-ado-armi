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
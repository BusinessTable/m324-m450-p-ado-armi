'use client'

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import CategoryFilter from "./CategoryFilter";
import styles from "./TodoContainer.module.css";

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState(["All", "Work", "Personal", "Shopping"]); // Standardkategorien
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getInitialTodos = () => {
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  };

  useEffect(() => {
    setTodos(getInitialTodos());
  }, []);

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const addTodoItem = (title, priority, category, dueDate) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
      priority,
      category,
      dueDate, // Fälligkeitsdatum hinzufügen
    };
    setTodos([...todos, newTodo]);
  };

  const updateCategory = (id, newCategory) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, category: newCategory };
        }
        return todo;
      })
    );
  };

  const filterTodosByCategory = () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };

    // Zuerst nach Kategorie filtern
    const filteredTodos =
      selectedCategory === "All"
        ? todos
        : todos.filter((todo) => todo.category === selectedCategory);

    // Dann nach Fälligkeitsdatum und Priorität sortieren
    return filteredTodos.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      if (!isNaN(dateA) && !isNaN(dateB)) {
        return dateA - dateB; // Frühere Deadlines zuerst
      }

      if (!isNaN(dateA)) return -1; // Aufgaben mit Deadlines haben Vorrang
      if (!isNaN(dateB)) return 1;

      return priorityOrder[a.priority] - priorityOrder[b.priority]; // Falls keine Deadlines vorhanden sind
    });
  };

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const addNewCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div className={styles.inner}>
      <Header />
      <InputTodo
        addTodoProps={addTodoItem}
        addCategoryProps={addNewCategory}
        categories={categories}
      />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <TodosList
        todos={filterTodosByCategory()} // Gefilterte und sortierte Todos
        handleChangeProps={handleChange}
        deleteTodoProps={delTodo}
        setUpdate={(title, id) => {
          setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
          );
        }}
        updateCategoryProps={updateCategory}
        categories={categories} // Übergabe der Kategorienliste an TodosList
      />
    </div>
  );
};

export default TodoContainer;

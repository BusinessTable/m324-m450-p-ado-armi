"use client";

import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import styles from "./TodoContainer.module.css";

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);

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

  const addTodoItem = (title, priority) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
      priority, // Neue Priorität hinzufügen
    };
    setTodos([...todos, newTodo]);
  };

  const updatePriority = (id, newPriority) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, priority: newPriority };
        }
        return todo;
      })
    );
  };

  const sortTodosByPriority = () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return [...todos].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  return (
    <div className={styles.inner}>
      <Header />
      <InputTodo addTodoProps={addTodoItem} />
      <TodosList
        todos={sortTodosByPriority()} // Aufgaben sortieren
        handleChangeProps={handleChange}
        deleteTodoProps={delTodo}
        updatePriorityProps={updatePriority} // Priorität aktualisieren
      />
    </div>
  );
};

export default TodoContainer;

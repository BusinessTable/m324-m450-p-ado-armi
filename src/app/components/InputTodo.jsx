import React, { useState } from "react";
import styles from "./InputTodo.module.css";

const InputTodo = ({ addTodoProps }) => {
  const [inputText, setInputText] = useState("");
  const [priority, setPriority] = useState("medium"); // Standardpriorität

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTodoProps(inputText, priority);
      setInputText("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Add Task..."
        value={inputText}
        onChange={handleInputChange}
        className={styles.input}
      />
      <select
        value={priority}
        onChange={handlePriorityChange}
        className={styles.select}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" className={styles.submitBtn}>
        Add
      </button>
    </form>
  );
};

export default InputTodo;

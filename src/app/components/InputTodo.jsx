import React, { useState } from "react";
import styles from "./InputTodo.module.css";

const InputTodo = ({ addTodoProps, addCategoryProps, categories }) => {
  const [inputText, setInputText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Work");
  const [newCategory, setNewCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategoryProps(newCategory.trim());
      setCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTodoProps(inputText, priority, category, dueDate);
      setInputText("");
      setPriority("medium");
      setCategory("Work");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Task Title</label>
        <input
          type="text"
          placeholder="Add Task..."
          value={inputText}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Priority</label>
        <select
          value={priority}
          onChange={handlePriorityChange}
          className={styles.select}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Category</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className={styles.select}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>New Category</label>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={handleNewCategoryChange}
          className={styles.newCategoryInput}
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className={styles.addCategoryBtn}
        >
          Add Category
        </button>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          className={styles.dateInput}
        />
      </div>
      <button type="submit" className={styles.submitBtn}>
        Add Task
      </button>
    </form>
  );
};

export default InputTodo;

/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const { completed, id, title, priority, category, dueDate } = props.todo;

  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  useEffect(
    () => () => {
      console.log("Cleaning up...");
    },
    []
  );

  const handleCategoryChange = (e) => {
    props.updateCategoryProps(id, e.target.value);
  };

  // Funktion zur Überprüfung, ob die Deadline in den nächsten 24 Stunden liegt
  const isDueSoon = () => {
    if (!dueDate) return false;
    const now = new Date();
    const due = new Date(dueDate);
    return due - now <= 24 * 60 * 60 * 1000 && due > now;
  };

  const itemStyle = isDueSoon()
    ? { backgroundColor: "#ffe6e6" } // Rot markieren, wenn bald fällig
    : {};

  return (
    <li className={styles.item} style={itemStyle} data-type="todo-item">
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => props.handleChangeProps(id)}
          name="checkbox"
        />
        <button
          data-set="delete-todo-btn"
          onClick={() => props.deleteTodoProps(id)}
        >
          <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
        <span className={styles.priority}>Prio: ({priority})</span>
        <span style={completed ? completedStyle : null}>{title}</span>
        {dueDate && <span className={styles.dueDate}>Due: {dueDate}</span>}
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={title}
        onChange={(e) => {
          props.setUpdate(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />
      <div className={styles.categorySelect}>
        <label htmlFor={`category-${id}`}>Category:</label>
        <select
          id={`category-${id}`}
          value={category}
          onChange={handleCategoryChange}
          name="category"
        >
          {props.categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </li>
  );
};

export default TodoItem;

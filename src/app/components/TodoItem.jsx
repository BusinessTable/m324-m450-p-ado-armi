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

  const { completed, id, title, category } = props.todo;

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

  return (
    <li className={styles.item} data-type="todo-item">
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
        <span style={completed ? completedStyle : null}>{title}</span>
        <span className={styles.category}>({category})</span>
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

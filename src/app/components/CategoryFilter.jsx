import React from "react";
import styles from "./CategoryFilter.module.css";

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="categoryFilter">Filter by Category: </label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className={styles.select}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [ingredient, setIngredient] = useState("");
  const [mealType, setMealType] = useState("any");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient) {
      onSearch(ingredient, mealType);
    } else {
      alert("Please enter at least one ingredient!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Enter ingredient..."
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
        <option value="any">Any Meal</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snacks">Snacks</option>
        <option value="Salad">Salad</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}

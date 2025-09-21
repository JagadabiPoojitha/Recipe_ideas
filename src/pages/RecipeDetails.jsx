import React from "react";

export default function RecipeDetails({ recipe, onClose }) {
  // Extract ingredients with measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  // Split instructions into steps
  const steps = recipe.strInstructions
    ? recipe.strInstructions.split(/[\r\n]+/).filter(step => step.trim() !== "")
    : [];

  return (
    <div className="recipe-modal">
      <div className="recipe-content">
        {/* Close Button */}
        <button onClick={onClose} className="close-btn">X</button>

        <h2>{recipe.strMeal}</h2>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />

        {/* Cooking Time */}
        <div className="cooking-time">
          <h3>⏲ Cooking Time</h3>
          <p>Prep time: 15 minutes</p>
          <p>Cook time: 30 minutes</p>
          <p>Total time: 45 minutes</p>
        </div>

        {/* Ingredients */}
        <div className="ingredients">
          <h3>🥗 Required Ingredients</h3>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Process */}
        <div className="instructions">
          <h3>👩‍🍳 Process (Step by Step)</h3>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button onClick={onClose} style={{ background: "#4CAF50" }}>
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

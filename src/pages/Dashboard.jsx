import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

export default function Dashboard({ onLogout }) {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searched, setSearched] = useState(false);

  // Search recipes by multiple ingredients
  const searchRecipes = async () => {
    if (!query) return;
    setSearched(true);

    const ingredients = query.split(",").map(i => i.trim().toLowerCase());

    try {
      // Fetch recipes for each ingredient
      const results = await Promise.all(
        ingredients.map(async (ingredient) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
          );
          const data = await res.json();
          return data.meals || [];
        })
      );

      // Flatten results and count matches
      const recipeMap = {};
      results.flat().forEach(r => {
        if (!recipeMap[r.idMeal]) {
          recipeMap[r.idMeal] = { ...r, matchCount: 1 };
        } else {
          recipeMap[r.idMeal].matchCount += 1;
        }
      });

      // Convert to array and sort by matchCount descending
      const combined = Object.values(recipeMap).sort((a, b) => b.matchCount - a.matchCount);
      setRecipes(combined);
    } catch (err) {
      console.error(err);
      setRecipes([]);
    }
  };

  // Fetch detailed recipe info for modal
  const fetchRecipeDetails = async (id) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      if (data.meals) {
        const meal = data.meals[0];
        const recipeDetails = {
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          time: meal.strInstructions.length < 200 ? 20 : 40,
          ingredients: Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i+1}`]).filter(Boolean),
          steps: meal.strInstructions.split(". ").filter(Boolean),
        };
        setSelectedRecipe(recipeDetails);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Recipe Finder</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter ingredients separated by commas"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchRecipes()}
        />
        <button onClick={searchRecipes}>Search</button>
      </div>

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((r) => (
            <RecipeCard
              key={r.idMeal}
              recipe={{
                id: r.idMeal,
                title: r.strMeal,
                image: r.strMealThumb,
                time: r.matchCount * 15 // approximate time based on matched ingredients
              }}
              onClick={() => fetchRecipeDetails(r.idMeal)}
            />
          ))
        ) : (
          <p className="no-results">
            {searched ? "No recipes found. Try different ingredients." : "No recipes found. Try different ingredients."}
          </p>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
}

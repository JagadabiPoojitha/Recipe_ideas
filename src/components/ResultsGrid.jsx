import RecipeCard from "./RecipeCard";

export default function ResultGrid({ recipes, onSelect }) {
  if (!recipes.length) return <p>No recipes found!</p>;

  return (
    <div className="result-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} onSelect={() => onSelect(recipe)} />
      ))}
    </div>
  );
}

export default function RecipeCard({ recipe, onClick }) {
  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="time-badge">{recipe.time} min</div>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      {recipe.matchCount && <p className="match-count">{recipe.matchCount} ingredients matched</p>}
    </div>
  );
}

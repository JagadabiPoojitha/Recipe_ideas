export default function RecipeModal({ recipe, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={recipe.image} alt={recipe.title} className="modal-image" />
        <h2>{recipe.title}</h2>
        <p className="time">Ready in: {recipe.time} minutes</p>

        <h3>Ingredients:</h3>
        <ul className="ingredients-list">
          {recipe.ingredients.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>

        <h3>Step-by-Step Instructions:</h3>
        <ol className="steps-list">
          {recipe.steps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

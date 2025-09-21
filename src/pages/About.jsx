// src/pages/About.jsx
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{ textAlign: "center", padding: "50px", minHeight: "100vh" }}>
      <h1>About CookTaylor</h1>
      <p>
        CookTaylor is your smart kitchen assistant. You can search recipes based on ingredients,
        meal type, and number of servings. Click on a dish to get detailed step-by-step instructions.
      </p>
      <Link to="/">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>Go to Home</button>
      </Link>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-page">
      <h1>Welcome to CookTaylor</h1>
      <p>Your smart kitchen assistant for quick recipes!</p>
      <div className="landing-buttons">
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn">Register</button>
        </Link>
        <Link to="/about">
          <button className="btn">About</button>
        </Link>
      </div>
    </div>
  );
}

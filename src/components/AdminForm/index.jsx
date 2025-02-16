import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { initializeGitHub } from "../../functions/github";
import validateGitHubToken from "../../functions/validateGitHubToken";

import "./AdminForm.scss";

export default function AdminForm() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles form submission.
   * - Validates the GitHub token.
   * - Initializes GitHub connection and redirects to the repositories page.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const isValid = await validateGitHubToken(token, owner);
      if (!isValid) {
        setError("Invalid GitHub token or Username. Please try again.");
        return;
      }

      localStorage.setItem("github_owner", owner);
      localStorage.setItem("github_token", token);

      // Initialize GitHub API connection
      initializeGitHub(token);

      navigate("/repositories");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles input changes for both owner and token fields.
   * - Updates the corresponding state.
   * - Clears the error message if it exists.
   */
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  // Form validation: ensures both fields are filled before submission
  const isFormValid = owner.trim() !== "" && token.trim() !== "";

  return (
    <div className="AdminForm">
      <h1>GitHub Admin</h1>
      <p className="AdminForm__subtitle">
        Enter your GitHub credentials to manage repositories
      </p>

      <form onSubmit={handleSubmit}>
        <div className="AdminForm__group">
          <label className="AdminForm__group_label" htmlFor="owner">
            GitHub Username
          </label>
          <input
            id="owner"
            className="AdminForm__group_input"
            value={owner}
            onChange={handleInputChange(setOwner)}
            placeholder="MarkZuckerberg"
            required
          />
        </div>

        <div className="AdminForm__group">
          <label className="AdminForm__group_label" htmlFor="token">
            GitHub Token
          </label>
          <input
            id="token"
            className="AdminForm__group_input"
            type="password"
            value={token}
            onChange={handleInputChange(setToken)}
            placeholder="ghp_xxxxxxxxxxxx"
            required
          />
        </div>

        {/* Displays error message if authentication fails */}
        {error && <p className="AdminForm__error">{error}</p>}

        <Button
          theme="black"
          size="L"
          type="submit"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Checking..." : "Log In"}
        </Button>
      </form>
    </div>
  );
}

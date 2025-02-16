import { Octokit } from "@octokit/rest";

/**
 * validate GitHub Token checks the validity of a provided GitHub token by attempting to authenticate
 * the user and comparing the token owner with the expected owner. Returns true if valid, false otherwise.
 * @param {string} token
 * @returns {Promise<boolean>}
 */
async function validateGitHubToken(token, owner) {
  try {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.rest.users.getAuthenticated();

    if (data.login.toLowerCase() !== owner.toLowerCase()) {
      console.error("Owner does not match token owner:", data.login);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Invalid GitHub token:", err);
    return false;
  }
}

export default validateGitHubToken;

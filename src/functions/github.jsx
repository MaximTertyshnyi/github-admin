import { Octokit } from "@octokit/rest";

let octokit = null;

export function initializeGitHub(token) {
  octokit = new Octokit({ auth: token });
}

function ensureGitHubClient() {
  if (!octokit) {
    const token = localStorage.getItem("github_token");
    if (!token) throw new Error("GitHub token is missing");
    initializeGitHub(token);
  }
}

export async function getRepositories() {
  ensureGitHubClient();
  return octokit.rest.repos
    .listForAuthenticatedUser({
      sort: "updated",
      per_page: 100,
    })
    .then((res) => res.data);
}

export async function createRepository(owner, name, description, isPrivate) {
  ensureGitHubClient();
  return octokit.rest.repos
    .createForAuthenticatedUser({
      owner,
      name,
      description,
      private: isPrivate,
    })
    .then((res) => res.data);
}

export async function updateRepository(owner, name, description, isPrivate) {
  ensureGitHubClient();
  return octokit.rest.repos
    .update({
      owner,
      repo: name,
      description,
      private: isPrivate,
    })
    .then((res) => res.data);
}

export async function deleteRepository(owner, name) {
  ensureGitHubClient();
  return octokit.rest.repos.delete({
    owner,
    repo: name,
  });
}

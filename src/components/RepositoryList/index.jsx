import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../Button";
import { RepositoryPopup } from "../RepositoryPopups/RepositoryPopup";
import {
  loadRepositoriesRequest,
  setActiveDialog,
} from "../../stores/repository/actions";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerOverlay } from "../SpinnerOverlay";
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { RepositoryActions } from "./RepositoryActions";

import "./RepositoryList.scss";

export default function RepositoryList() {
  const dispatch = useDispatch();
  const { repositories, selectedRepo, activeDialog } = useSelector(
    (state) => state.repositories
  );
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (repositories.length === 0) {
      const owner = localStorage.getItem("github_owner");
      if (owner) {
        dispatch(loadRepositoriesRequest(owner));
      }
    }
  }, [dispatch, repositories.length]);

  // Sort repositories by creation date in descending order (newest first)
  const sortedRepositories = repositories.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const handleDialogSuccess = () => {
    const owner = localStorage.getItem("github_owner");
    if (owner) {
      dispatch(loadRepositoriesRequest(owner));
    }
  };

  return (
    <div className="RepositoryList">
      <div className="RepositoryList__header">
        <h1>Repositories</h1>
        <Button
          theme={isMobile ? "mini" : "fit"}
          size="L"
          onClick={() => dispatch(setActiveDialog("create"))}
          icon={<Plus />}
        >
          {!isMobile && "New Repository"}
        </Button>
      </div>

      {/* It is displayed until the repositories are fully loaded. */}
      {repositories.length === 0 ? (
        <SpinnerOverlay size="large" />
      ) : isMobile ? (
        // Render repositories as cards in mobile
        <div className="RepositoryList__cards">
          {sortedRepositories.map((repo) => (
            <div key={repo.id} className="RepositoryList__card">
              <div className="RepositoryList__card_item">
                <strong>Name:</strong> {repo.name}
              </div>
              <div className="RepositoryList__card_item">
                <strong>Description:</strong>{" "}
                {repo.description || "No description"}
              </div>
              <div className="RepositoryList__card_item">
                <strong>Visibility:</strong>{" "}
                {repo.private ? "Private" : "Public"}
              </div>
              <RepositoryActions repo={repo} />
            </div>
          ))}
        </div>
      ) : (
        // Render repositories as a table for desktops
        <table className="RepositoryList__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRepositories.map((repo) => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{repo.description || "No description"}</td>
                <td>{repo.private ? "Private" : "Public"}</td>
                <td className="RepositoryList__table_actions">
                  <RepositoryActions repo={repo} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Popups for creating, updating, and deleting repositories */}
      <RepositoryPopup
        mode="create"
        open={activeDialog === "create"}
        onClose={() => dispatch(setActiveDialog(null))}
        onSuccess={handleDialogSuccess}
      />

      <RepositoryPopup
        mode="update"
        open={activeDialog === "update"}
        onClose={() => dispatch(setActiveDialog(null))}
        repository={selectedRepo}
        onSuccess={() => {}}
      />

      <RepositoryPopup
        mode="delete"
        open={activeDialog === "delete"}
        onClose={() => dispatch(setActiveDialog(null))}
        repository={selectedRepo}
        onSuccess={() => {}}
      />
    </div>
  );
}

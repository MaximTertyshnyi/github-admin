import { useState, useEffect } from "react";
import { Button } from "../Button";
import PropTypes from "prop-types";
import {
  createRepositoryRequest,
  deleteRepositoryRequest,
  updateRepositoryRequest,
} from "../../stores/repository/actions";
import { useDispatch } from "react-redux";

import "./RepositoryPopups.scss";

// // Repository Popup is a modal component for creating, updating, and deleting repositories.
// It manages form state, handles input changes, and dispatches appropriate actions based on the mode.
export function RepositoryPopup({
  mode,
  open,
  onClose,
  repository,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPrivate: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const owner = localStorage.getItem("github_owner");

  useEffect(() => {
    if (mode === "update" && repository) {
      setFormData({
        name: repository.name,
        description: repository.description || "",
        isPrivate: repository.private,
      });
    } else if (mode === "create" && open) {
      setFormData({ name: "", description: "", isPrivate: false });
    }
  }, [mode, repository, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "create") {
        dispatch(
          createRepositoryRequest(
            owner,
            formData.name,
            formData.description,
            formData.isPrivate
          )
        );
      } else if (mode === "update") {
        dispatch(
          updateRepositoryRequest(
            owner,
            repository.name,
            formData.description,
            formData.isPrivate
          )
        );
      } else if (mode === "delete" && repository) {
        dispatch(deleteRepositoryRequest(owner, repository.name));
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(`Failed to ${mode} repository:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="RepositoryPopup">
      <div className="RepositoryPopup__window">
        <div className="RepositoryPopup__header">
          <h2>
            {mode === "create" ? (
              "Create New Repository"
            ) : mode === "update" ? (
              <>
                Update Repository:{" "}
                <span className="RepositoryPopup__header_repository-name">
                  {repository?.name}
                </span>
              </>
            ) : (
              <>
                Delete Repository:{" "}
                <span className="RepositoryPopup__header_repository-name">
                  {repository?.name}
                </span>
              </>
            )}
          </h2>
          <button className="RepositoryPopup__close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "create" && (
            <div className="RepositoryPopup__form">
              <label className="RepositoryPopup__form_label" htmlFor="name">
                Repository Name
              </label>
              <input
                id="name"
                name="name"
                className="RepositoryPopup__form_input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {mode !== "delete" && (
            <>
              <div className="RepositoryPopup__form">
                <span className="RepositoryPopup__form_input-name">
                  Description
                </span>
                <textarea
                  id="description"
                  name="description"
                  className="RepositoryPopup__form_textarea"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="RepositoryPopup__form">
                <div className="RepositoryPopup__form_checkbox">
                  <div className="RepositoryPopup__form_text">
                    <span>Private Repository</span>
                  </div>
                  <label className="RepositoryPopup__form_label">
                    <div className="RepositoryPopup__form_switch">
                      <input
                        type="checkbox"
                        name="isPrivate"
                        checked={formData.isPrivate}
                        onChange={handleChange}
                      />
                      <span className="RepositoryPopup__form_slider"></span>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="RepositoryPopup__footer">
            <Button variant="secondary" theme="border" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="RepositoryPopup__button"
              type="submit"
              theme="fit"
              disabled={isLoading}
            >
              {isLoading
                ? `${mode.charAt(0).toUpperCase() + mode.slice(1)}ing...`
                : `${mode.charAt(0).toUpperCase() + mode.slice(1)} Repository`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

RepositoryPopup.propTypes = {
  mode: PropTypes.oneOf(["create", "update", "delete"]).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  repository: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    private: PropTypes.bool.isRequired,
  }),
  onSuccess: PropTypes.func.isRequired,
};

import { useDispatch } from "react-redux";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import {
  setActiveDialog,
  setSelectedRepo,
} from "../../stores/repository/actions";
import { Button } from "../Button";

// Repository Actions component provides action buttons for each repository
export function RepositoryActions({ repo }) {
  const dispatch = useDispatch();

  const handleAction = (action) => {
    dispatch(setSelectedRepo(repo));
    dispatch(setActiveDialog(action));
  };

  return (
    <div className="RepositoryList__card_actions">
      <Button
        variant="secondary"
        icon
        onClick={() => handleAction("update")}
        theme="touch"
      >
        <Pencil />
      </Button>

      <Button
        variant="danger"
        icon
        onClick={() => handleAction("delete")}
        theme="touch"
      >
        <Trash2 />
      </Button>

      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <Button variant="secondary" icon theme="touch">
          <ExternalLink />
        </Button>
      </a>
    </div>
  );
}

RepositoryActions.propTypes = {
  repo: PropTypes.shape({
    html_url: PropTypes.string.isRequired,
  }).isRequired,
};

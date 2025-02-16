import {
  LOAD_REPOSITORIES_SUCCESS,
  CREATE_REPOSITORY_SUCCESS,
  UPDATE_REPOSITORY_SUCCESS,
  DELETE_REPOSITORY_SUCCESS,
  SET_SELECTED_REPO,
  SET_ACTIVE_DIALOG,
} from "../types";

const initialState = {
  repositories: [],
  selectedRepo: null,
  activeDialog: null,
  owner: localStorage.getItem("github_owner") || "",
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REPOSITORIES_SUCCESS:
      localStorage.setItem("repositories", JSON.stringify(action.payload));
      return {
        ...state,
        repositories: action.payload,
      };

    case CREATE_REPOSITORY_SUCCESS: {
      const updatedRepos = [...state.repositories, action.payload];
      localStorage.setItem("repositories", JSON.stringify(updatedRepos));
      return {
        ...state,
        repositories: updatedRepos,
      };
    }

    case UPDATE_REPOSITORY_SUCCESS: {
      const updatedRepos = state.repositories.map((repo) =>
        repo.name === action.payload.name ? action.payload : repo
      );
      localStorage.setItem("repositories", JSON.stringify(updatedRepos));
      return {
        ...state,
        repositories: updatedRepos,
      };
    }

    case DELETE_REPOSITORY_SUCCESS: {
      const updatedRepos = state.repositories.filter(
        (repo) => repo.name !== action.payload
      );
      localStorage.setItem("repositories", JSON.stringify(updatedRepos));
      return {
        ...state,
        repositories: updatedRepos,
      };
    }

    case SET_SELECTED_REPO:
      return {
        ...state,
        selectedRepo: action.payload,
      };

    case SET_ACTIVE_DIALOG:
      return {
        ...state,
        activeDialog: action.payload,
      };

    default:
      return state;
  }
};

export default repositoryReducer;

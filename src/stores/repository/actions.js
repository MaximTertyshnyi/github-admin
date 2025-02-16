import {
  LOAD_REPOSITORIES_REQUEST,
  LOAD_REPOSITORIES_SUCCESS,
  LOAD_REPOSITORIES_FAILURE,
  CREATE_REPOSITORY_REQUEST,
  CREATE_REPOSITORY_SUCCESS,
  CREATE_REPOSITORY_FAILURE,
  UPDATE_REPOSITORY_REQUEST,
  UPDATE_REPOSITORY_SUCCESS,
  UPDATE_REPOSITORY_FAILURE,
  DELETE_REPOSITORY_REQUEST,
  DELETE_REPOSITORY_SUCCESS,
  DELETE_REPOSITORY_FAILURE,
  SET_SELECTED_REPO,
  SET_ACTIVE_DIALOG,
} from "../types";

export const loadRepositoriesRequest = (owner) => ({
  type: LOAD_REPOSITORIES_REQUEST,
  payload: owner,
});

export const loadRepositoriesSuccess = (repositories) => ({
  type: LOAD_REPOSITORIES_SUCCESS,
  payload: repositories,
});

export const loadRepositoriesFailure = (error) => ({
  type: LOAD_REPOSITORIES_FAILURE,
  payload: error,
});

export const createRepositoryRequest = (
  owner,
  name,
  description,
  isPrivate
) => ({
  type: CREATE_REPOSITORY_REQUEST,
  payload: { owner, name, description, isPrivate },
});

export const createRepositorySuccess = (newRepo) => ({
  type: CREATE_REPOSITORY_SUCCESS,
  payload: newRepo,
});

export const createRepositoryFailure = (error) => ({
  type: CREATE_REPOSITORY_FAILURE,
  payload: error,
});

export const updateRepositoryRequest = (
  owner,
  name,
  description,
  isPrivate
) => ({
  type: UPDATE_REPOSITORY_REQUEST,
  payload: { owner, name, description, isPrivate },
});

export const updateRepositorySuccess = (updatedRepo) => ({
  type: UPDATE_REPOSITORY_SUCCESS,
  payload: updatedRepo,
});

export const updateRepositoryFailure = (error) => ({
  type: UPDATE_REPOSITORY_FAILURE,
  payload: error,
});

export const deleteRepositoryRequest = (owner, name) => ({
  type: DELETE_REPOSITORY_REQUEST,
  payload: { owner, name },
});

export const deleteRepositorySuccess = (name) => ({
  type: DELETE_REPOSITORY_SUCCESS,
  payload: name,
});

export const deleteRepositoryFailure = (error) => ({
  type: DELETE_REPOSITORY_FAILURE,
  payload: error,
});

export const setSelectedRepo = (repo) => ({
  type: SET_SELECTED_REPO,
  payload: repo,
});

export const setActiveDialog = (dialog) => ({
  type: SET_ACTIVE_DIALOG,
  payload: dialog,
});

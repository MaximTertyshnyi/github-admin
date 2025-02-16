import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../types";
import {
  getRepositories,
  createRepository,
  updateRepository,
  deleteRepository,
} from "../../functions/github";
import {
  createRepositoryFailure,
  createRepositorySuccess,
  deleteRepositoryFailure,
  deleteRepositorySuccess,
  loadRepositoriesFailure,
  loadRepositoriesSuccess,
  updateRepositoryFailure,
  updateRepositorySuccess,
} from "./actions";

function* loadRepositoriesSaga(action) {
  try {
    const repos = yield call(getRepositories, action.payload);
    yield put(loadRepositoriesSuccess(repos));
  } catch (error) {
    yield put(loadRepositoriesFailure(error.message));
  }
}

function* createRepositorySaga(action) {
  try {
    const newRepo = yield call(
      createRepository,
      action.payload.owner,
      action.payload.name,
      action.payload.description,
      action.payload.isPrivate
    );
    yield put(createRepositorySuccess(newRepo));
  } catch (error) {
    yield put(createRepositoryFailure(error.message));
  }
}

function* updateRepositorySaga(action) {
  try {
    const updatedRepo = yield call(
      updateRepository,
      action.payload.owner,
      action.payload.name,
      action.payload.description,
      action.payload.isPrivate
    );
    yield put(updateRepositorySuccess(updatedRepo));
  } catch (error) {
    yield put(updateRepositoryFailure(error.message));
  }
}

function* deleteRepositorySaga(action) {
  try {
    yield call(deleteRepository, action.payload.owner, action.payload.name);
    yield put(deleteRepositorySuccess(action.payload.name));
  } catch (error) {
    yield put(deleteRepositoryFailure(error.message));
  }
}

export function* watchRepositories() {
  yield takeLatest(types.LOAD_REPOSITORIES_REQUEST, loadRepositoriesSaga);
  yield takeLatest(types.CREATE_REPOSITORY_REQUEST, createRepositorySaga);
  yield takeLatest(types.UPDATE_REPOSITORY_REQUEST, updateRepositorySaga);
  yield takeLatest(types.DELETE_REPOSITORY_REQUEST, deleteRepositorySaga);
}

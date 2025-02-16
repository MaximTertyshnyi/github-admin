import { all } from "redux-saga/effects";
import { watchRepositories } from "./repository/sagas";

export default function* rootSaga() {
  yield all([watchRepositories()]);
}

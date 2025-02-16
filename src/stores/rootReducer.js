import { combineReducers } from "redux";
import repositoryReducer from "./repository/reducers";

const rootReducer = combineReducers({
  repositories: repositoryReducer,
});

export default rootReducer;

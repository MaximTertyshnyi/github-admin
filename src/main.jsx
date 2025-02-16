import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/index";
import "./index.css";

import Repositories from "./pages/Repositories";
import LoginPage from "./pages/LoginPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/repositories" element={<Repositories />} />
      </Routes>
    </Router>
  </Provider>
);

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Navigate,
  Routes,
} from "react-router-dom";
import { DatePicker } from "antd";

//mobx
import { Provider } from "mobx-react";
import stores from "./stores";
import Home from "./pages/Home";

function App() {
  return (
    <Provider {...stores}>
      <Router history={Navigate}>
        <Home />
      </Router>
    </Provider>
  );
}

export default App;

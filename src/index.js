import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
// 引入样式
import "./assets/CSS/reset.css";
import "./assets/Js/rem";
import "antd-mobile/dist/antd-mobile.css";


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

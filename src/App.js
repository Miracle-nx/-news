import React from "react";
import "./App.css";


import { Route, Redirect,Switch } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Index from "./pages/Index/Index.js";

// 配置以及路由
function App() {
  return (
    <div className="App">
      <Index></Index>
      <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/index" component={Index}></Route>
      <Redirect to="/index"></Redirect>
      </Switch>
    
    </div>
  );
}

export default App;

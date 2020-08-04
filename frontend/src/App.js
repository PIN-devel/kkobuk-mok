import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import User from "./Pages/User";
import Friends from "./Pages/Friends";
import Channel from "./Pages/Channel";
import Main from "./Pages/Main";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import ContactUs from "./Pages/About/ContactUs";
import Page404 from "./Pages/Page404";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  // const SERVER_URL = "http://i3b109.p.ssafy.io";
  const SERVER_URL = "http://localhost:8000";
  const [auth, setAuth] = useState(false); //  !auth 면 redirect 시켜버리자
  const [channelIn, setChannelIn] = useState(null);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ auth, setAuth, SERVER_URL, channelIn, setChannelIn }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/current" component={Main} />
            <Route exact path="/user" component={User} />
            <Route exact path="/Friends" component={Friends} />
            <Route exact path="/Channel" component={Channel} />
            <Route exact path="/ContactUs" component={ContactUs} />
            <Route exact path="/not-found" component={Page404} />
            <Redirect to="not-found/" />;
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

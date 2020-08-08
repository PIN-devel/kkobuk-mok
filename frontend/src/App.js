import React, { useState, useEffect, useRef } from "react";
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
import Cookies from "js-cookie";
import Axios from "axios";

function App() {
  // const SERVER_URL = "http://3.35.17.150";
  const SERVER_URL = "http://localhost:8000";
  const [auth, setAuth] = useState(false); //  !auth 면 redirect 시켜버리자
  const [channelIn, setChannelIn] = useState(null);
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("유이펙 발동");
    const userID = Cookies.get("myUserId");
    if (userID) {
      if (!auth) {
        setAuth(true);
      }
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Jwt ${token}`,
        },
      };
      Axios.get(`${SERVER_URL}/accounts/${userID}/`, config)
        .then((res) => {
          setUser({
            myFirst: res.data.data.first_name,
            myLast: res.data.data.last_name,
            myEmail: res.data.data.email,
            myFriends: res.data.data.friends,
            myImage: res.data.data.image,
          });
          setIsLoaded(true);
          console.log("success");
        })
        .catch((err) => {
          console.log("fail");
          console.log(err);
        });
    }
  }, [auth]);

  if (!auth) {
    return (
      <div className="App">
        <AuthContext.Provider
          value={{
            auth,
            setAuth,
            SERVER_URL,
            channelIn,
            setChannelIn,
            user,
            setUser,
          }}
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
  } else {
    if (!isLoaded) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="App">
        <AuthContext.Provider
          value={{
            auth,
            setAuth,
            SERVER_URL,
            channelIn,
            setChannelIn,
            user,
            setUser,
          }}
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
}

export default App;

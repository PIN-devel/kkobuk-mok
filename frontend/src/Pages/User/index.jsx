import React, { useContext, useState, useEffect } from "react";
import Profile from "../../components/UserInfo/Profile";
import Graphs from "../../components/UserInfo/Graphs";
import Layout from "../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import { Redirect } from "react-router-dom";

const User = () => {
  const { auth, SERVER_URL } = useContext(AuthContext);
  const [me, setMe] = useState(null);
  const [afterChange, setAfterChange] = useState(false);

  const token = Cookies.get("token");
  const userID = Cookies.get("myUserId");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/accounts/${userID}/`, config)
      .then((res) => {
        console.log("유저정보 가져오기 성공");
        console.log(res.data.data);
        setMe(res.data.data);
      })
      .catch((err) => {
        console.log("유저정보 가져오기 실패");
        console.log(err.response);
      });
  }, [afterChange]);
  if (me) {
    console.log('점수')
    console.log(me.posture[0])
  }
  if (!auth) {
    return <Redirect to="/" />;
  } else {
    return (
      me && (
        <UserContext.Provider value={{ afterChange, setAfterChange }}>
          <Layout>
            <Wrapper>
              <Profile
                name={me.name}
                image={me.image}
                email={me.email}
                friends={me.friends}
                today={me.posture[0].score}
              />
              <Graphs data={me.posture.slice(1, 8)} />
            </Wrapper>
          </Layout>
        </UserContext.Provider>
      )
    );
  }
};

export default User;

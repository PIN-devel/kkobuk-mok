import React, { useContext, useState, useEffect } from "react";
import Profile from "../../components/UserInfo/Profile";
import Graphs from "../../components/UserInfo/Graphs";
import Layout from "../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";
import Cookies from "js-cookie";
import Axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";

const User = () => {
  const { auth, SERVER_URL } = useContext(AuthContext);
  const [me, setMe] = useState(null);
  const token = Cookies.get("token");
  const userID = Cookies.get("myUserId");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  useEffect(() => {
    Axios.get(`${SERVER_URL}/accounts/${userID}/`, config)
      .then((res) => {
        console.log("유저정보 가져오기 성공");
        console.log(res.data.data)
        setMe(res.data.data);
      })
      .catch((err) => {
        console.log("유저정보 가져오기 실패");
        console.log(err.response);
      });
  }, []);

  if (!auth) {
    return <Redirect to="/" />;
  } else {
    return (
      me && (
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
      )
    );
  }
};

export default User;

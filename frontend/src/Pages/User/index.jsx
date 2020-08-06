import React from "react";
import Profile from "../../components/UserInfo/Profile";
import Graphs from "../../components/UserInfo/Graphs";
import Layout from "../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";

const User = () => {
  return (
    <Layout>
      <Wrapper>
        <Profile />
        <Graphs />
      </Wrapper>
    </Layout>
  );
};

export default User;

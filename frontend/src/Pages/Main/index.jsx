import React from "react";
import Layout from "../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";
import CurrentStatus from "../../components/Main/CurrentStatus";
import ControlPanel from "../../components/Main/ControlPanel";

const Main = () => {
  return (
    <Layout>
      <Wrapper>
        <CurrentStatus />
        <ControlPanel />
      </Wrapper>
    </Layout>
  );
};

export default Main;

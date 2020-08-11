import React, { useState, useContext, useEffect, useRef } from "react";
import Layout from "../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";
import CurrentStatus from "../../components/Main/CurrentStatus";
import ControlPanel from "../../components/Main/ControlPanel";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../contexts/AuthContext";
import { MainContext } from "../../contexts/MainContext";

const Main = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const [currentImg, setCurrentImg] = useState();
  const [currentScore, setCurrentScore] = useState();
  const [currentHu, setCurrentHu] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentScoreData, setCurrentScoreData] = useState([]);
  const [currentHour, setCurrentHour] = useState(0);
  const [currentMin, setCurrentMin] = useState(0);
  const [action, setAction] = useState(0);

  const scoreDataRef = useRef(currentScoreData);
  scoreDataRef.current = currentScoreData;

  const getInfo = () => {
    axios
      .get(`${SERVER_URL}/accounts/maininfo/`, config)
      .then((res) => {})
      .catch((err) => {
        console.log("정보 못받는중");
        console.log(err);
      });
  };

  useEffect(() => {
    getInfo();
    const tick = setInterval(getInfo, 1000);
    return function cleanup() {
      clearInterval(tick);
    };
  }, []);

  return (
    <Layout>
      <MainContext.Provider
        value={{
          currentImg,
          currentScore,
          currentHu,
          currentTemp,
          currentScoreData,
          currentHour,
          currentMin,
          action,
        }}
      >
        <Wrapper>
          <CurrentStatus />
          <ControlPanel />
        </Wrapper>
      </MainContext.Provider>
    </Layout>
  );
};

export default Main;

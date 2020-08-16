import React, { useEffect, useState, useContext } from "react";
import { Wrapper } from "./styles";
import { MainContext } from "../../../contexts/MainContext";

const Temperature = (props) => {
  const { currentTemp } = useContext(MainContext);
  const [myTemp, setMyTemp] = useState(0);

  useEffect(() => {
    setMyTemp(currentTemp);
  }, [currentTemp]);

  return (
    <Wrapper myTemp={myTemp} currentTemp={currentTemp}>
      <div className="container">
        <div className="progress2 progress-moved">
          <div className="progress-bar2"></div>
        </div>
        <span>0°C</span>
        <span className="word">{currentTemp}°C</span>
        <span className="progress">50°C</span>
      </div>
    </Wrapper>
  );
};

export default Temperature;

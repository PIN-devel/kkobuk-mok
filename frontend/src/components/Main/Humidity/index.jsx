import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../contexts/MainContext";
import { Wrapper } from "./styles";

const Humidity = () => {
  const { currentHu } = useContext(MainContext);
  const [myHu, setMyHu] = useState(0);

  useEffect(() => {
    setMyHu(currentHu);
  }, [currentHu]);

  return (
    <Wrapper myHu={myHu} currentHu={currentHu}>
      <div className="container">
        <div className="myDiv">
          <input type="checkbox" className="water" />
          <label for="water">
            <div className="fill"></div>
          </label>
        </div>
        <span>0%</span>
        <span className="word">{currentHu}%</span>
        <span className="progress">100%</span>
      </div>
    </Wrapper>
  );
};

export default Humidity;

import React, { useEffect, useState, useContext } from "react";
import { Wrapper } from "./styles";
import { MainContext } from "../../../contexts/MainContext";

const Temperature = (props) => {
  const { currentHu } = useContext(MainContext);
  const [myHu, setMyHu] = useState(0);

  useEffect(() => {
    setMyHu(currentHu);
  }, [currentHu]);

  return (
    <Wrapper myHu={myHu} currentHu={currentHu}>
      <div className="container">
        <div className="progress2 progress-moved">
          <div className="progress-bar2"></div>
        </div>
        <span>0%</span>
        <span className="word">{currentHu}%</span>
        <span>100%</span>
      </div>
    </Wrapper>
  );
};

export default Temperature;

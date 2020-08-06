import React from "react";
import { Wrapper } from "./styles";

const value = 56;
const Humidity = (props) => {
  return (
    <Wrapper value={props.humidity}>
      <div className="container">
        <input type="checkbox" id="humid" />
        <label for="humid" className="mybox">
          <div className="fill"></div>
        </label>
        <div className="words">
          <span>0%</span>
          <span className="current">습도: {props.humidity}%</span>
          <span>100%</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Humidity;

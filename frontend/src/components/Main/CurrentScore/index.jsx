import React from "react";
import { Wrapper } from "./styles";

const CurrentScore = (props) => {
  return (
    <Wrapper>
      <div className="container">
        <div className="score">
          <h1 className="myscore">
            {props.myScore === 3
              ? "완벽"
              : props.myScore === 2
              ? "좋음"
              : "보통"}
          </h1>
        </div>
        <div className="circle" style={{ animationDelay: "-3s" }}></div>
        <div className="circle" style={{ animationDelay: "-2s" }}></div>
        <div className="circle" style={{ animationDelay: "-1s" }}></div>
        <div className="circle" style={{ animationDelay: "0s" }}></div>
      </div>
    </Wrapper>
  );
};

export default CurrentScore;

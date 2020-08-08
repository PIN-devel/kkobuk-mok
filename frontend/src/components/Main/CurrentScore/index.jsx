import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles";

const CurrentScore = (props) => {
  const [myWord, setMyWord] = useState("");
  const [myClass, setMyClass] = useState("whiteCircle");
  useEffect(() => {
    if (props.myScore === 3) {
      setMyWord("위험");
      setMyClass("redCircle");
    } else if (props.myScore === 2) {
      setMyWord("보통");
      setMyClass("yellowCircle");
    } else if (props.myScore === 1) {
      setMyWord("완벽");
      setMyClass("blueCircle");
    } else {
      setMyWord("");
      setMyClass("whiteCircle");
    }
  }, [props.myScore]);
  return (
    <Wrapper>
      <div className="container">
        <div className="score">
          <h1 className="myscore">{myWord}</h1>
        </div>
        <div className={myClass} style={{ animationDelay: "-3s" }}></div>
        <div className={myClass} style={{ animationDelay: "-2s" }}></div>
        <div className={myClass} style={{ animationDelay: "-1s" }}></div>
        <div className={myClass} style={{ animationDelay: "0s" }}></div>
      </div>
    </Wrapper>
  );
};

export default CurrentScore;

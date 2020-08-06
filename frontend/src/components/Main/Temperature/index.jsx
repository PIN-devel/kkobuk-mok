import React from "react";
import { Wrapper } from "./styles";

const Temperature = (props) => {
  return (
    <Wrapper>
      <h1>온도: {props.temperature}도</h1>
    </Wrapper>
  );
};

export default Temperature;

import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "./styles";
import Typography from "@material-ui/core/Typography";
import { MainContext } from "../../../contexts/MainContext";

const Temperature = (props) => {
  const { currentTemp } = useContext(MainContext);
  const [myTemp, setMyTemp] = useState(0);
  useEffect(() => {
    const newT = currentTemp;
    setMyTemp(newT);
  }, [currentTemp]);
  return (
    <Wrapper>
      <Typography>현재 온도 : {myTemp} 도</Typography>
    </Wrapper>
  );
};

export default Temperature;

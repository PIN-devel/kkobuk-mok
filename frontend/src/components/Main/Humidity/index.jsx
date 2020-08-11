import React, { useState, useContext, useEffect } from "react";
import { Wrapper } from "./styles";
import Typography from "@material-ui/core/Typography";
import { MainContext } from "../../../contexts/MainContext";

const Humidity = (props) => {
  const { currentHu } = useContext(MainContext);
  const [myHu, setMyHu] = useState(0);
  useEffect(() => {
    const newH = currentHu;
    setMyHu(newH);
  }, [currentHu]);
  return (
    <Wrapper>
      <Typography id="discrete-slider-always" gutterBottom>
        습도 : {myHu} %
      </Typography>
    </Wrapper>
  );
};

export default Humidity;

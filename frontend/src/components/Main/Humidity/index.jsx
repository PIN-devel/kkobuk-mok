import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../contexts/MainContext";
import { Wrapper } from "./styles";
import { Grid } from "@material-ui/core";

const Humidity = () => {
  const { currentHu } = useContext(MainContext);
  const [myHu, setMyHu] = useState(0);

  useEffect(() => {
    setMyHu(currentHu);
  }, [currentHu]);
  return (
    <Wrapper myHu={myHu} currentHu={currentHu}>
      <Grid container>
        <div className="container">
          <div className="myDiv">
            <input type="checkbox" className="water" />
            <label forhtml="water">
              <div className="fill"></div>
            </label>
          </div>
          <span>0%</span>
          <span className="word">{currentHu}%</span>
          <span className="progress">100%</span>
        </div>
      </Grid>
    </Wrapper>
  );
};

export default Humidity;

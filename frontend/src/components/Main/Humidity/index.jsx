import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../contexts/MainContext";
import { Wrapper } from "./styles";
import {Grid} from "@material-ui/core"

const Humidity = () => {
  const { currentHu } = useContext(MainContext);
  const [myHu, setMyHu] = useState(0);

  useEffect(() => {
    setMyHu(currentHu);
  }, [currentHu]);
  return (
    <Wrapper myHu={myHu} currentHu={currentHu}>
      <Grid container>
        <Grid xs={12}>
      <i class="fas fa-tint"></i>
      <span>습도</span>
        </Grid>
        <Grid xs={12}>

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
      </Grid>
    </Wrapper>
  );
};

export default Humidity;

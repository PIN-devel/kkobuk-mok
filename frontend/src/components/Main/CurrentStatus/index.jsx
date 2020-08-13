import React, { useContext } from "react";
import CurrentScore from "../CurrentScore";
import Room from "../Room";
import { Grid } from "@material-ui/core";
import { Wrapper, TStatus } from "./styles";
import { MainContext } from "../../../contexts/MainContext";
import HControl from "../HControl";
import SleepT from "../../../assets/sleepboard.png";
import ReadyT from "../../../assets/readyboard.png";

const CurrentStatus = (props) => {
  const { currentImg, isTurtleOn } = useContext(MainContext);

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <CurrentScore />
        </Grid>
        <Grid item xs={12} md={4}>
          <Room />
        </Grid>
        <Grid item xs={12} md={4} container>
          <Grid item xs={12}>
            {isTurtleOn ? <TStatus src={ReadyT} /> : <TStatus src={SleepT} />}
          </Grid>
          <Grid item xs={12}>
            <HControl />
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CurrentStatus;

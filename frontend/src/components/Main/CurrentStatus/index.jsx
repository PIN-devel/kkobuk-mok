import React, { useContext } from "react";
import CurrentScore from "../CurrentScore";
import Room from "../Room";
import { Grid } from "@material-ui/core";
import { Wrapper } from "./styles";
import { MainContext } from "../../../contexts/MainContext";
import HControl from "../HControl";

const CurrentStatus = (props) => {
  const { currentHu } = useContext(MainContext);

  return (
    <Wrapper className="outer Ho">
      <Grid container className="inner ho!">
        <Grid item xs={12} md={4}>
          <CurrentScore />
        </Grid>
        <Grid item xs={12} md={4}>
          <Room />
        </Grid>
        <Grid item xs={12} md={4}>
          <HControl />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CurrentStatus;

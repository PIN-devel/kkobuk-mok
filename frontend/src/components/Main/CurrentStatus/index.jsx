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
    <Wrapper>
      <Grid container spacing={1} className="hello">
        <Grid item xs={12} md={4}>
          <CurrentScore />
        </Grid>
        <Grid item xs={12} md={4} container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Room />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <HControl />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CurrentStatus;

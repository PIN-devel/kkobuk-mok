import React from "react";
import { Wrapper, Image } from "./styles";
import { Grid } from "@material-ui/core";
import Temperature from "../Temperature";
import Humidity from "../Humidity";

const Room = (props) => {
  return (
    <Wrapper>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Temperature temperature={props.temperature} />
        </Grid>
        <Grid item xs={12}>
          <Humidity humidity={props.humidity} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Room;

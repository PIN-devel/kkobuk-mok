import React from "react";
import { Wrapper, Image } from "./styles";
import { Grid } from "@material-ui/core";
import Temperature from "../Temperature";
import Humidity from "../Humidity";
const Room = (props) => {
  const temperature = 5;
  const humidity = 10;
  return (
    <Wrapper>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Temperature />
        </Grid>
        <Grid item xs={12}>
          <Humidity />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Room;

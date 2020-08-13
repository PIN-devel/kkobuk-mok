import React from "react";
import { Wrapper, RoomTitle } from "./styles";
import { Grid, Typography } from "@material-ui/core";
import Temperature from "../Temperature";
import Humidity from "../Humidity";
import RoomT from "../../../assets/RoomT.png";

const Room = () => {
  return (
    <Wrapper>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <RoomTitle src={RoomT} />
        </Grid>
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

import React from "react";
import { Wrapper, RoomTitle } from "./styles";
import { Grid, Typography } from "@material-ui/core";
import Temperature from "../Temperature";
import Humidity from "../Humidity";

const Room = () => {
  return (
    <Wrapper>
      <Grid container className="Total">
        <Grid item xs={12} className="Top">
          <Temperature />
        </Grid>
        <Grid item xs={12} className="Mid" container>
          <Grid item xs={4} className="Mid1" container>
            <Grid item xs={12} className="one-half"></Grid>
          </Grid>
          <Grid item xs={4} className="Mid2" container>
            <Grid item xs={12} className="thermo">
              <i
                id="thermoI"
                class="fas fa-thermometer-three-quarters fa-3x"
              ></i>
            </Grid>
            <Grid item xs={12} className="humi">
              <i id="humiI" class="fas fa-tint fa-3x"></i>
            </Grid>
          </Grid>
          <Grid item xs={4} className="Mid3" container>
            <Grid item xs={12} className="three-half"></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="Bot">
          <Humidity />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Room;

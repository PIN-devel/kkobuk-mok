import React from "react";
import CurrentScore from "../CurrentScore";
import Room from "../Room";
import { Grid } from "@material-ui/core";
import { Wrapper, Image } from "./styles";
import Bono2 from "../../../assets/bono2.jpg";

const CurrentStatus = (props) => {
  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Image src={Bono2} alt="gone" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CurrentScore />
        </Grid>
        <Grid item xs={12} md={3}>
          <Room />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CurrentStatus;

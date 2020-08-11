import React, { useContext } from "react";
import CurrentScore from "../CurrentScore";
import Room from "../Room";
import { Grid } from "@material-ui/core";
import { Wrapper, Image } from "./styles";
import { MainContext } from "../../../contexts/MainContext";

const CurrentStatus = (props) => {
  const { currentImg } = useContext(MainContext);

  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Image src={currentImg} />
        </Grid>
        <Grid item xs={12} md={5}>
          <CurrentScore />
        </Grid>
        <Grid item xs={12} md={4} className="dodo">
          <Room />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CurrentStatus;

import React from "react";
import { Wrapper } from "./styles";
import { Grid } from "@material-ui/core";
import Progress from "../Progress";
import Timer from "../Timer";

const ControlPanel = () => {
  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12} md={6} className="ProgressChart">
          <Progress />
        </Grid>
        <Grid item xs={12} md={6} className="Panel">
          <Timer />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default ControlPanel;

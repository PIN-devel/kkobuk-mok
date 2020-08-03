import React from "react";
import { Wrapper } from "./styles";
import { Button, Grid } from "@material-ui/core";

const ControlPanel = (props) => {
  return (
    <Wrapper>
      <form>
        <Grid container spacing={4} className="">
          <Grid item xs={4}>
            <input type="text" placeholder="시간" />
            시간
          </Grid>
          <Grid item xs={4}>
            <input type="text" placeholder="분" />분
          </Grid>
          <Grid item xs={4}>
            <input type="text" placeholder="" />
          </Grid>
        </Grid>
        <Button>Start</Button>
      </form>
    </Wrapper>
  );
};

export default ControlPanel;

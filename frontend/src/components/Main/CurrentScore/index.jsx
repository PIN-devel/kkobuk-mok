import React from "react";
import { Wrapper } from "./styles";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const CurrentScore = (props) => {
  return (
    <Wrapper>
      <div className="container">
        <div className="score">
          <h1 className="myscore">58</h1>
        </div>
        <div className="circle" style={{ animationDelay: "-3s" }}></div>
        <div className="circle" style={{ animationDelay: "-2s" }}></div>
        <div className="circle" style={{ animationDelay: "-1s" }}></div>
        <div className="circle" style={{ animationDelay: "0s" }}></div>
      </div>
    </Wrapper>
  );
};

export default CurrentScore;

import React, { useState, useContext, useEffect } from "react";
import Bono from "../../../assets/bono1.jpg";
import { Wrapper, Image } from "./styles";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CircleProgressBar from "../Today";
import ChangeInfo from "../../Auth/ChangeInfo";
import { AuthContext } from "../../../contexts/AuthContext";

const useStyles = makeStyles({
  buttonStyle: {
    border: 10,
    backgroundColor: "#4fc3f7",
  },
});

const Profile = (props) => {
  const { SERVER_URL } = useContext(AuthContext);

  const changeScore = (n) => {
    if (n == 0) {
      return 0;
    } else {
      return 4 - n;
    }
  };

  const findPercentage = (n) => {
    if (n == 0) {
      return 0;
    } else {
      return (3 - n) * 50;
    }
  };

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Image src={`${SERVER_URL}${props.image}`} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className="profileInfo">
            <h3>이름: {props.name}</h3>
            <h3>이메일: {props.email}</h3>
            {/* <h3>제품키: {props.mykey}</h3> */}
            <h3>현재 {props.friends.length}명의 친구들과 교류하고 있습니다</h3>
            <ChangeInfo />
          </div>
        </Grid>
        <Grid item xs={12} sm={5} className="Today">
          <CircleProgressBar
            numinside={changeScore(props.today)}
            percentage={findPercentage(props.today)}
            speed={10}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Profile;

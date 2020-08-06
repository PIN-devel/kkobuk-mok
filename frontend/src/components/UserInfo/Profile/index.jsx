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

const Profile = () => {
  const { user, SERVER_URL } = useContext(AuthContext);
  const tester = () => {
    console.log(user.myImage);
    console.log(typeof user.myImage);
  };
  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Image src={user.myImage} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className="profileInfo">
            <h3>
              이름: {user.myLast} {user.myFirst}
            </h3>
            <h3>이메일: {user.myEmail}</h3>
            <h3>제품키: QWER-QWER-QWER-QWER</h3>
            <h3>현재 {4}명의 친구들과 교류하고 있습니다</h3>
            <button onClick={tester}>tester</button>
            <ChangeInfo />
          </div>
        </Grid>
        <Grid item xs={12} sm={5} className="Today">
          <CircleProgressBar percentage={75} speed={10} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Profile;

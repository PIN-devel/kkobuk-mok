import React from "react";
import Bono from "../../../assets/bono1.jpg";
import { Wrapper, InsideWrapper, Image } from "./styles";
import { Link, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CircleProgressBar from "../Today";
const useStyles = makeStyles({
  buttonStyle: {
    border: 10,
    backgroundColor: "#4fc3f7",
  },
});

const Profile = (props) => {
  const classes = useStyles();
  const isMe = true;
  const isFriend = true;
  const { myLast, myFirst, myEmail, myKey, myFriends } = {
    myLast: "김",
    myFirst: "싸피",
    myEmail: "SSAFFFFFY@turtle.com",
    myKey: "EZ1E-PD14-UZS5-HKPJ",
    myFriends: ["동식", "수미", "호준", "인남"],
  };
  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Image src={Bono} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className="profileInfo">
            <h3>
              이름: {myLast}
              {myFirst}
            </h3>
            <h3>이메일: {myEmail}</h3>
            <h3>제품키: {myKey}</h3>
            <h3>현재 {myFriends.length}명의 친구들과 교류하고 있습니다</h3>
            <div className="profileButton">
              {isMe ? (
                <Button className={classes.buttonStyle}>
                  <span>정보 변경</span>
                </Button>
              ) : isFriend ? (
                <Button>친구 신청</Button>
              ) : (
                <Button>친구 삭제</Button>
              )}
            </div>
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

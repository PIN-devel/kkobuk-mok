import React, { useState, useContext } from "react";
import Bono from "../../../assets/bono1.jpg";
import { Wrapper, Image } from "./styles";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CircleProgressBar from "../Today";
import ChangeInfo from "../../Auth/ChangeInfo";
import { AuthContext } from "../../../contexts/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

const useStyles = makeStyles({
  buttonStyle: {
    border: 10,
    backgroundColor: "#4fc3f7",
  },
});

const Profile = () => {
  const classes = useStyles();
  const { SERVER_URL } = useContext(AuthContext);
  const isMe = true;
  const isFriend = true;
  const [user, setUser] = useState();

  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const test = () => {
    axios
      .get(`${SERVER_URL}/${config}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 유저 정보 받아오기
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
            <button onClick={test}>실험</button>
            <h3>제품키: {myKey}</h3>
            <h3>현재 {myFriends.length}명의 친구들과 교류하고 있습니다</h3>
            <div className="profileButton">
              {isMe ? (
                <ChangeInfo user={user} setUser={setUser} />
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

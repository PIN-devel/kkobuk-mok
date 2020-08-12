import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import HighRank from "./HighRank";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";

import axios from "axios";
import Cookies from "js-cookie";
import ChannelChat from "../ChannelChat";
import UserCard from "../UserCard";

const ChannelDetail = (props) => {
  const { channel } = props;
  const { channelIn, setChannelIn, SERVER_URL } = useContext(AuthContext);

  const classes = useStyles();
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `jwt ${token}`,
    },
  };

  // 채널 나가기
  const exitChannel = () => {
    const url = `${SERVER_URL}/rooms/${channel.id}/`;
    const handleSetChannelIn = () => {
      setChannelIn(null);
    };
    axios
      .post(url, {}, config)
      .then((res) => {
        console.log("채널 나가기 성공");
        // console.log(res.data.data);
        handleSetChannelIn();
      })
      .catch((err) => {
        console.log("채널 나가기 에러");
        console.log(err.response);
      });
  };
  //
  console.log(channel);
  return (
    <div className={classes.root}>
      <button onClick={exitChannel}>채널 나가기</button>

      {/* <ChannelChat /> 일단 여기는  보류 */}
      <UserCard channel={channel} />

      {/* <h1>채널 이름 ; {channel.title}</h1> */}
      <h3>
        이거 멤버들 쭈루룩 나오게 할 수도 있고
        {/* {channel.members.map((member) => (
          <Grid item key={member.id} lg={4} md={6} xs={12}>
            {member.email}
          </Grid>
        ))} */}
      </h3>
      <h2>
        멤버 정보들 channelCard에서 받아오는 roomserializer(memberserializer)가
        바뀐 상태임 이거 합의해서 멤버 정보 뭐 받아올지 결정하셈
      </h2>
      <h1>채널 이름 ; {channel.name}</h1>
      <h2>채널 슬로건? : {channel.description}</h2>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <div>
            <h1>여기는 이 채널 평균 점수를 보여주자</h1>
          </div>
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <HighRank />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChannelDetail;

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import HighRank from "./HighRank";
import { Typography, Grid, Divider, Button } from "@material-ui/core";
import useStyles from "./styles";

import axios from "axios";
import Cookies from "js-cookie";

import ChannelDetailCard from "../ChannelDetailCard";
import ChannelCard from "../ChannelCard";

const ChannelDetail = (props) => {
  const { channel } = props;
  const { channelIn, setChannelIn, SERVER_URL } = useContext(AuthContext);
  const [channelData, setChannelData] = useState(null);

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

  //채널 정보 가져오기
  const getChannel = () => {
    const url = `${SERVER_URL}/rooms/${channel.id}/`;
    const handleChannelData = (channelData) => {
      setChannelData(channelData);
    };
    axios
      .get(url, config)
      .then((res) => {
        // console.log("채널 디테일 정보가져옴");
        // console.log(res.data);
        handleChannelData(res.data.data);
      })
      .catch((err) => {
        // console.log("채널 입장 에러");
        console.log(err.response);
      });
  };

  // 1초마다 채널 디테일 정보 받아온다
  useEffect(() => {
    getChannel();
    const cycle = setInterval(getChannel, 1000);
    return function cleanup() {
      clearInterval(cycle);
    };
  }, []);
  console.log("채널 넘어온 정보");
  console.log(channel);
  console.log("채널디테일정보");
  console.log(channelData);

  return (
    <div className={classes.root}>
      {channelData && (
        <div>
          <Typography align="center" gutterBottom variant="h5">
            {channel.name}
          </Typography>
          <Typography align="center" gutterBottom variant="subtitle1">
            {channel.description}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              <Button
                color="primary"
                onClick={() => {
                  exitChannel();
                }}
              >
                채널 나가기
              </Button>
            </Grid>

            {channelData.members.map((member) => (
              <Grid item lg={6} md={6} xl={12} xs={12}>
                <ChannelDetailCard member={member} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ChannelDetail;

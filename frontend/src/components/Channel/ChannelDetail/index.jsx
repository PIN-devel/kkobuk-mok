import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import HighRank from "./HighRank";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const ChannelDetail = (props) => {
  const { channel } = props;
  const { channelIn, setChannelIn } = useContext(AuthContext);
  const exitChannel = () => {
    setChannelIn(null);
    // 여기 인자로 channel 정보 받고 setChannel에 그 채널 넣어주자
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <button onClick={exitChannel}>채널 나가기</button>

      <h1>채널 이름 ; {channel.title}</h1>
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

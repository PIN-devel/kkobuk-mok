import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GetAppIcon from "@material-ui/icons/GetApp";

import { AuthContext } from "../../../contexts/AuthContext";
import useStyles from "./styles";

import axios from "axios";
import Cookies from "js-cookie";

const ChannelCard = (props) => {
  const { className, channel, ...rest } = props;
  const classes = useStyles();

  const { channelIn, setChannelIn, SERVER_URL } = useContext(AuthContext);

  // 채널 디테일 가져오는 것
  const [channelData, setChannelData] = useState({});

  // 채널 입장
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `jwt ${token}`,
    },
  };
  const entranceChannel = () => {
    const url = `${SERVER_URL}/rooms/${channel.id}/`;
    const handleSetChannelIn = (channel) => {
      setChannelIn(channel);
    };
    axios
      .post(url, {}, config)
      .then((res) => {
        // console.log("채널 카드 성공");
        // console.log(res.data.data);
        handleSetChannelIn(res.data.data);
      })
      .catch((err) => {
        // console.log("채널 입장 에러");
        console.log(err.response);
      });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Button onClick={entranceChannel}>입장하기</Button>
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="channel"
            className={classes.image}
            // src={channelData.imageUrl}
            src={channel.imageUrl}
          />
        </div>
        <Typography align="center" gutterBottom variant="h4">
          {/* {channel.title} */}
          채널이름 : {/* {channelData.name} */}
          {channel.name}
        </Typography>
        <Typography align="center" variant="body1">
          {/* {channelData.description} */}
          채널 : {channel.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              여기는 이 채널 평균 점수
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            {/* <GetAppIcon className={classes.statsIcon} /> */}
            <Typography display="inline" variant="body2">
              {channel.member_num} members
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ChannelCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ChannelCard;

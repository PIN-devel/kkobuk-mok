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
import { ThemeProvider } from "styled-components";

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
        console.log("채널 카드에서 입장할 때 받아오는 채널 정보");
        console.log(res.data);
        handleSetChannelIn(res.data.data);
      })
      .catch((err) => {
        // console.log("채널 입장 에러");
        console.log(err.response);
      });
  };

  return (
    <Card style={{cursor:"pointer"}} {...rest} className={clsx(classes.root, className)} onClick={() => {entranceChannel();}}>
      {/* <Button
        onClick={() => {
          entranceChannel();
        }}
      >
        입장하기
      </Button> */}
      <CardContent className={classes.cardContent}>
        {/* <div className={classes.imageContainer}>
          <img
            alt="channel"
            className={classes.image}
            // src={channelData.imageUrl}
            src={channel.imageUrl}
          />
        </div> */}
        <Typography className={classes.typography} style={{margin:"20px"}} align="center" gutterBottom variant="h4">
          {channel.name}
        </Typography>
        <Typography className={classes.typography} variant="body2" color="textSecondary" component="p">
          {channel.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography className={classes.typography} display="inline" variant="body2">
            {channel.created_at.slice(0,19)}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            {/* <GetAppIcon className={classes.statsIcon} /> */}
            <Typography className={classes.typography} display="inline" variant="body2">
              <i class="fas fa-users"></i> {channel.member_num}
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

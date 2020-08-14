import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button,
  Avatar,
  CircularProgress,
  Box,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import clsx from "clsx";
import useStyles from "./styles";
import ChannelChart from "../ChannelChart";

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress size={40} color="primary" variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

const ChannelDetailCard = (props) => {
  const { member } = props;
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <Grid container spacing={4}>
        <Grid item lg={3} md={3} xl={3} xs={3}>
          <CardContent>
            {/* <div className={classes.imageContainer}>
              <img
                alt="channel"
                className={classes.image}
                // src={channelData.imageUrl}
                // src={}
              />
            </div> */}
            <Grid container spacing={4}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Avatar className={classes.large}>kkobuk</Avatar>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
            <br></br>
            <Typography align="right" gutterBottom variant="body1">
              {member.name}
            </Typography>
            <br></br>
            <Grid container spacing={4}>
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                <CircularProgressWithLabel value={80} />
              </Grid>
              <Grid item xs={2}></Grid>

              <Grid item xs={2}>
                <CircularProgressWithLabel value={90} />
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid item lg={9} md={9} xl={9} xs={9}>
          <ChannelChart member={member} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ChannelDetailCard;

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
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
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
      <Grid container spacing={1}>
        <Grid item lg={3} md={3} xl={3} xs={3}>
          <Chip
            variant="outlined"
            size="small"
            icon={<FaceIcon />}
            label="공부중"
            color="primary"
            className={classes.memberChip}
          />
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.memberProfile}>
            {/* <div className={classes.imageContainer}>
              <img
                alt="channel"
                className={classes.image}
                // src={channelData.imageUrl}
                // src={}
              />
            </div> */}
            <Grid item lg={6}></Grid>
            <Grid item lg={6}> 
              <Avatar className={classes.large}>kkobuk</Avatar>
              <Typography gutterBottom variant="body1">
                <Box textAlign="center" m={1}>
                {member.name}님
                </Box>
              </Typography>
            </Grid>

            {/* <Grid 
              container
              direction="row"
              justify="center"
              alignItems="center">
              <Grid item>
                <Grid item>
                  <CircularProgressWithLabel value={80} />
                </Grid>
                <Grid item >
                  <CircularProgressWithLabel value={90} />
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item lg={9} md={9} xl={9} xs={9}>
          <ChannelChart member={member} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ChannelDetailCard;

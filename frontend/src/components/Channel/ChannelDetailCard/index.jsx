import React, { useState } from "react";
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
import clsx from "clsx";
import useStyles from "./styles";
import ChannelChart from "../ChannelChart";

const ChannelDetailCard = (props) => {
  const { member } = props;
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <Grid container spacing={4}>
        <Grid item lg={3} md={3} xl={3} xs={3}>
          <CardContent>
            <div className={classes.imageContainer}>
              <img
                alt="channel"
                className={classes.image}
                // src={channelData.imageUrl}
                // src={}
              />
            </div>
            <Typography align="center" gutterBottom variant="body1">
              {member.name}
            </Typography>
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

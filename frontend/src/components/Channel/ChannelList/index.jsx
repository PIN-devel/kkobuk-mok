import React, { useState, useContext, useEffect } from "react";
import { IconButton, Grid, Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import ChannelsToolbar from "../ChannelsToolbar";
import ChannelCard from "../ChannelCard";
import useStyles from "./styles";

const ChannelList = (props) => {
  // console.log("채널리스트 컴포 렌더");
  // const { searchData, setSearchData } = useContext(SearchContext);
  const { channels } = props;

  // useEffect(() => setChannels(searchData), [searchData]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ChannelsToolbar />
      <div className={classes.content}>
        <Grid container spacing={3}>
          {channels.map((channel) => (
            <Grid item key={channel.id} lg={4} md={6} xs={12}>
              <ChannelCard channel={channel} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChannelList;

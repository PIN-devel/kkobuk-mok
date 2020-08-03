import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Grid, Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import ChannelsToolbar from "../ChannelsToolbar";
import ChannelCard from "../ChannelCard";

// import { SearchContext } from "../../../contexts/SearchContext";

// import { createMuiTheme } from "@material-ui/core";

// const theme = createMuiTheme({
//   zIndex: {
//     appBar: 1200,
//     drawer: 1100,
//   },
// });

// ------------------------이거 나중에 참고해서 axios 보내---------------------

//   const SERVER_URL = "http://i3b109.p.ssafy.io";
//   const token = Cookies.get("token");
//   const config = {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   };
//   const [channelList, setChannelList] = useState(null);
//   const test = () => {
//     axios
//       .get(SERVER_URL + "/rooms", config)
//       .then((res) => {
//         console.log("성공");
//         console.log(res.data.data);
//         setChannelList(res.data.data[0].name);
//       })
//       .catch((res) => {
//         console.log("에러!!");
//         console.log(res);
//       });

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const ChannelList = (props) => {
  console.log("채널리스트 컴포 렌더");
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

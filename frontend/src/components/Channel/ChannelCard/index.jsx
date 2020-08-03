import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: "0 auto",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
  },
  statsItem: {
    display: "flex",
    alignItems: "center",
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
}));

const ChannelCard = (props) => {
  const { className, channel, ...rest } = props;
  const classes = useStyles();

  const { channelIn, setChannelIn } = useContext(AuthContext);
  const entranceChannel = () => {
    setChannelIn(channel);
    // 여기 인자로 channel 정보 받고 setChannel에 그 채널 넣어주자
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Button onClick={entranceChannel}>입장하기</Button>
      <CardContent>
        <div className={classes.imageContainer}>
          <img alt="channel" className={classes.image} src={channel.imageUrl} />
        </div>
        <Typography align="center" gutterBottom variant="h4">
          {/* {channel.title} */}
          {channel.name}
        </Typography>
        <Typography align="center" variant="body1">
          {channel.description}
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
              {channel.members} Member
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

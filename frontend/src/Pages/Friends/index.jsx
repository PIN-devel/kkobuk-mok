import React, { useContext, useState, useEffect } from "react";
import Table from "../../components/Friends/Table/Table.js";
import Card from "../../components/Friends/Card/Card.js";
import CardHeader from "../../components/Friends/Card/CardHeader.js";
import CardBody from "../../components/Friends/Card/CardBody.js";
import Layout from "../../Layout/MyDash/Dashboard";
import ResponsiveDialog from "../../components/Friends/Dialog";
import SentFriendRequests from "../../components/Friends/SentFriendRequests";
import useStyles from "./styles";
import { AuthContext } from "../../contexts/AuthContext";
import { FriendContext } from "../../contexts/FriendContext";
import Axios from "axios";
import Cookies from "js-cookie";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Friends = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const classes = useStyles();
  // const [searchFriendOpen, setSearchFriendOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [requestMade, setRequestMade] = useState(0);
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const tableHead = [
    "이름",
    "이메일",
    "오늘의 점수",
    "일주일 점수",
    "친구 삭제",
  ];

  useEffect(() => {
    Axios.get(`${SERVER_URL}/accounts/friend/`, config)
      .then((res) => {
        console.log("친구들 불러오기 성공");
        const friends = res.data.data.friends.map((person) => {
          return [
            person.id,
            person.name,
            person.email,
            person.posture[0],
            person.posture[1],
          ];
        });
        setFriends(friends);
      })
      .catch((err) => {
        console.log("친구들 불러오기 실패");
        console.log(err.response);
      });
  }, []);

  return (
    <Layout>
      <FriendContext.Provider
        value={{
          requestMade,
          setRequestMade,
        }}
      >
        <div className={classes.root}>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={6}>
              <div className={classes.friendHeaderText}>친구 목록</div>
            </Grid>
            <Grid item xs></Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <SentFriendRequests />
              </Paper>
            </Grid>
            <Grid item xs={1}>
              <Paper className={classes.paper}>
                <ResponsiveDialog
                  sentRequests={sentRequests}
                  setSentRequests={setSentRequests}
                />
              </Paper>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>

          <Grid container>
            <Grid item xs={1} />
            <Grid item xs>
              <Table
                tableHeaderColor="primary"
                tableHead={tableHead}
                tableData={friends}
                setTableData={setFriends}
                dataType={1}
              />
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </div>
      </FriendContext.Provider>
    </Layout>
  );
};

export default Friends;

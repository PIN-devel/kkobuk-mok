import React, { useContext, useState, useEffect } from "react";
// import FriendAppBar from "../../components/Friends/FriendsAppBar/";

// import React from "react";
// // @material-ui/core components
// // core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
import Table from "../../components/Friends/Table/Table.js";
import Card from "../../components/Friends/Card/Card.js";
import CardHeader from "../../components/Friends/Card/CardHeader.js";
import CardBody from "../../components/Friends/Card/CardBody.js";
import Layout from "../../Layout/MyDash/Dashboard";
import ResponsiveDialog from "../../components/Friends/Dialog";
import useStyles from "./styles";
import { AuthContext } from "../../contexts/AuthContext";

const Friends = () => {
  const { user, SERVER_URL } = useContext(AuthContext);
  const classes = useStyles();
  // const [searchFriendOpen, setSearchFriendOpen] = useState(false);
  const [friends, setFriends] = useState([
    ["둘리", "hi@naver.com", 2.2, 1],
    ["길동이", "hi2@naver.com", 1.4, 2.6],
  ]);
  const tableHead = ["이름", "이메일", "오늘의 점수", "일주일 점수"];

  // useEffect(() => {
  //   const friends = user.myFriends.map((person) => {
  //     return [person.last_name + person.first_name, person.email, person.todayScore, person.weekScore];
  //   });
  //   setFriends(friends);
  // }, [user]);

  return (
    <Layout>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>친구 목록</h4>
          <p className={classes.cardCategoryWhite}>친구들과 으쌰으쌰</p>
        </CardHeader>
        <CardBody>
          <ResponsiveDialog />
          <Table
            tableHeaderColor="primary"
            tableHead={tableHead}
            tableData={friends}
            isLooking={false}
          />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Friends;

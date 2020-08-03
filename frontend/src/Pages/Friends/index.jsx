import React, { createContext, useState } from "react";
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

const Friends = () => {
  const classes = useStyles();
  // const [searchFriendOpen, setSearchFriendOpen] = useState(false);

  const tableHead = ["이름", "랭크", "오늘의 점수", "일주일 점수"];
  // const myFriendsList

  return (
    // <friendsContext.Provider value={(searchFriendOpen,setSearchFriendOpen )}>
    //         {</friendsContext.Provider>}
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
            tableData={[
              ["호준", "골드", "3", "1"],
              ["인남", "골드", "3", "1"],
              ["주현", "플레", "4", "1"],
              ["수미", "언랭", "0", "1"],
            ]}
          />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Friends;

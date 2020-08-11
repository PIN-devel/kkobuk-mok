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
import Axios from "axios";
import Cookies from "js-cookie";

const Friends = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const classes = useStyles();
  // const [searchFriendOpen, setSearchFriendOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const token = Cookies.get("token");
  const userID = Cookies.get("myUserId");
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
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>친구 목록</h4>
          <p className={classes.cardCategoryWhite}>친구들과 으쌰으쌰</p>
          <SentFriendRequests />
        </CardHeader>
        <CardBody>
          <ResponsiveDialog
            sentRequests={sentRequests}
            setSentRequests={setSentRequests}
          />
          <Table
            tableHeaderColor="primary"
            tableHead={tableHead}
            tableData={friends}
            setTableData={setFriends}
            dataType={1}
          />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Friends;

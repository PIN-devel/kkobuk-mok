import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Table from "../Table/Table";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";

const SentFriendRequests = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const [sentRequests, setSentRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const theme = useTheme();

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const tableHead = ["이름", "이메일", "요청 취소"];

  useEffect(() => {
    //여기서 보낸 친구요청 싹다 가져와서 sent에 담기 id값, 이름, 이메일 3가지 필요
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Jwt ${token}`,
      },
    };
    axios
      .get(`${SERVER_URL}/accounts/friend/request/`, config)
      .then((res) => {
        const newList = res.data.data.map((person) => {
          return [person.id, person.name, person.email];
        });
        setSentRequests(newList); // 이거 데이터 들어오는 값 확인해봐야함
        console.log("요청리스트 가져오기 성공");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("요청리스트 가져오기 실패");
      });
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          handleOpen();
        }}
      >
        보낸 친구 요청
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={modalOpen}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <h3>내가 보낸 친구 요청</h3>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Table
              tableHeaderColor="primary"
              tableHead={tableHead}
              tableData={sentRequests}
              setTableData={setSentRequests}
              dataType={3}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            끄기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SentFriendRequests;

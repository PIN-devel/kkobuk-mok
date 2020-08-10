import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";

const SentFriendRequests = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const [sentRequests, setSentRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const tableHead = ["이름", "이메일", "요청 취소"];

  useEffect(() => {
    //여기서 보낸 친구요청 싹다 가져와서 sent에 담기 id값, 이름, 이메일 3가지 필요
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

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Cookies from "js-cookie";
import axios from "axios";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const token = Cookies.get("token");
const config = {
  headers: {
    Authorization: `Jwt ${token}`,
  },
};

const ChangeInfo = () => {
  const { user, SERVER_URL } = useContext(AuthContext);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [old_password, setOld_Password] = useState("");
  const [new_password1, setNew_Password1] = useState("");
  const [new_password2, setNew_Password2] = useState("");
  const [newKey, setNewKey] = useState("");

  const handleOldP = (e) => {
    setOld_Password(e.target.value);
  };

  const handleNP1 = (e) => {
    setNew_Password1(e.target.value);
  };

  const handleNP2 = (e) => {
    setNew_Password2(e.target.value);
  };

  const sendPass = (pw) => {
    axios
      .post(SERVER_URL + "/rest-auth/password/change/", pw, config)
      .then((res) => {
        console.log(res);
        alert("비밀번호가 변경되었습니다");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("비번 변경 실패");
      });
  };

  const ChangePass = (e) => {
    e.preventDefault();
    if (new_password1 === new_password2) {
      sendPass({
        new_password1,
        new_password2,
        old_password,
      });
    } else {
      alert("새 비밀번호를 확인해주세요");
    }
  };

  const handleNewKey = (e) => {
    setNewKey(e.target.value);
  };

  const ChangeKey = (e) => {
    e.preventDefault();
    axios
      .post(SERVER_URL + `/registration/${newKey}/`, newKey, config)
      .then((res) => {
        alert("changed product key!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ImageHandler = (e) => {
    setNewImage(e.target.files[0]);
  };

  const EditImage = (e) => {
    e.preventDefault();
    axios
      .put(SERVER_URL + `${user.id}`, {
        ...user,
        image: newImage,
      })
      .then((res) => {
        console.log(res);
        alert("changed image!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditForm = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <input type="file" onChange={ImageHandler} />
        <Button
          className={classes.margin}
          variant="contained"
          color="primary"
          onClick={EditImage}
        >
          Edit Image
        </Button>
      </div>
      <div>
        <TextField
          type="password"
          label="Current Password"
          variant="outlined"
          onChange={handleOldP}
        />
        <TextField
          type="password"
          label="New Password"
          variant="outlined"
          onChange={handleNP1}
        />
        <TextField
          error={new_password1 === new_password2 ? false : true}
          helperText={
            new_password1 === new_password2 ? "" : "비밀번호를 확인해주세요"
          }
          type="password"
          label="Confirm Password"
          variant="outlined"
          onChange={handleNP2}
        />
        <Button
          className={classes.margin}
          variant="contained"
          color="primary"
          onClick={ChangePass}
        >
          Change Password
        </Button>
      </div>
      <div>
        <TextField
          label="Product Key"
          variant="outlined"
          onChange={handleNewKey}
        />
        <Button
          className={classes.margin}
          variant="contained"
          color="primary"
          onClick={ChangeKey}
        >
          Change Product Key
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        정보 변경
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {EditForm}
      </Modal>
    </div>
  );
};

export default ChangeInfo;

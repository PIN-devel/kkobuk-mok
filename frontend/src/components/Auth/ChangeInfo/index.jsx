import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Wrapper } from "./styles";
import { Button, CssBaseline } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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

const ChangeInfo = (props) => {
  const { SERVER_URL } = useContext(AuthContext);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newKey, setNewKey] = useState("");

  const handleCurP = (e) => {
    setCurPassword(e);
    console.log(curPassword);
  };

  const handleNP = (e) => {
    setNewPassword(e);
    console.log(newPassword);
  };

  const handleConP = (e) => {
    setConfirmPassword(e);
    console.log(confirmPassword);
  };

  const ChangePass = (e) => {
    e.preventDefault();
    if (props.user.password === curPassword) {
      axios
        .put(SERVER_URL + `${props.user.id}`, {
          ...props.user,
          password: newPassword,
        })
        .then(() => {
          alert("Changed password!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Wrong current password");
    }
  };

  const handleNewKey = (e) => {
    setNewKey(e);
  };

  const ChangeKey = (e) => {
    e.preventDefault();
    axios
      .put(SERVER_URL + `${props.user.id}`, {
        ...props.user,
        product_key: newKey,
      })
      .then(() => {
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

  const EditForm = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <TextField
          label="Current Password"
          variant="outlined"
          onChange={handleCurP}
        />
        <TextField
          label="New Password"
          variant="outlined"
          onChange={handleNP}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          onChange={handleConP}
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

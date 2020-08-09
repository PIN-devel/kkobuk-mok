import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Table from "../Table/Table";
// import SearchFriendBar from "../Search";
import { AuthContext } from "../../../contexts/AuthContext";
import SearchComponent from "../../Search";
import Cookies from "js-cookie";
import Axios from "axios";

const token = Cookies.get("token");
const config = {
  headers: {
    Authorization: `Jwt ${token}`,
  },
};

export default function ResponsiveDialog(props) {
  //   const decision = useContext(friendsContext);
  //   console.log(decision);
  const { SERVER_URL } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const [searchFriendOpen, setSearchFriendOpen] = useState(false);
  const tableHead = ["이름", "이메일"];
  const [foundList, setFoundList] = useState([]);
  const [friendName, setFriendName] = useState("");

  const findPerson = (name) => {
    Axios.get(
      `${SERVER_URL}/accounts/?kw=${name}&order_by='point'&period="month"`,
      config
    )
      .then((res) => {
        console.log("사람 찾기 성공");
        const pplList = res.data.data.map((person) => {
          return [person.last_name + person.first_name, person.email];
        });
        setFoundList(pplList);
        console.log(res);
      })
      .catch((err) => {
        console.log("사람 찾기 실패");
        console.log(err.response);
      });
  };

  useEffect(() => findPerson(friendName), [friendName]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        친구 찾기
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <SearchComponent
            searchData={friendName}
            setSearchData={setFriendName}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Table
              tableHeaderColor="primary"
              tableHead={tableHead}
              tableData={foundList}
              isLooking={true}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            끄기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

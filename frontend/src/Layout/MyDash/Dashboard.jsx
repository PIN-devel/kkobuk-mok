import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AuthContext } from "../../contexts/AuthContext";
import NestedList from "../MyDash/listItems";
import Footer from "../Footer";
import useStyles from "./styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Axios from "axios";

export default function Dashboard(props) {
  const { SERVER_URL, setAuth } = useContext(AuthContext);
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // 여기 header 유저 모양
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [wannaLogout, setWannaLogout] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event);
  };

  const tester = () => {
    console.log(friendRequests);
  };

  const handleClick2 = (e) => {
    setAnchorEl2(e);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const acceptRequest = (F_id) => {
    console.log("accepted");
    Axios.post(`${SERVER_URL}/accounts/friend/${F_id}/accept/`, null, config)
      .then((res) => {
        console.log("친구 수락 성공");
        const newList = friendRequests.filter(
          (comp) => comp.sender.id !== F_id
        );
        setFriendRequests(newList);
      })
      .catch((err) => {
        console.log("친구 수락 실패");
      });
  };

  const rejectRequest = (F_id) => {
    console.log("rejected");
    Axios.post(`${SERVER_URL}//accounts/friend/${F_id}/reject/`, null, config)
      .then((res) => {
        console.log("친구 거절 성공");
        const newList = friendRequests.filter(
          (comp) => comp.sender.id !== F_id
        );
        setFriendRequests(newList);
      })
      .catch((err) => {
        console.log("친구 거절 실패");
      });
  };

  const Logout = () => {
    Axios.post(`${SERVER_URL}/rest-auth/logout/`, config)
      .then((res) => {
        console.log(res);
        Cookies.remove("token");
        Cookies.remove("myUserId");
        setAuth(false);
        console.log("Logout success!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Axios.get(`${SERVER_URL}/accounts/friend/request/receive/`, config)
      .then((res) => {
        console.log("가져오기 성공");
        console.log(res.data.data);
        setFriendRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        console.log("가져오기 실패");
      });
  }, []);

  // 반응형
  // const isTablet = useMediaQuery("(max-width:960px)");

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            꼬북
          </Typography>
          <Button
            onClick={() => {
              tester();
            }}
          >
            테스트
          </Button>

          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="contained"
            color="inherit"
            onClick={(e) => {
              handleClick(e.currentTarget);
            }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/User">
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                Logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>

          <IconButton
            aria-controls="simple-menu2"
            aria-haspopup="true"
            variant="contained"
            color="inherit"
            onClick={(e) => {
              handleClick2(e.currentTarget);
            }}
          >
            <Badge badgeContent={friendRequests.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="simple-menu2"
            anchorEl2={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
          >
            {friendRequests.length === 0 ? (
              <MenuItem>
                <h4>친구 요청이 없습니다</h4>
              </MenuItem>
            ) : (
              friendRequests.map((req) => {
                return (
                  <MenuItem>
                    {req.sender.first_name}님의 친구요청
                    <Button
                      onClick={() => {
                        acceptRequest(req.sender.id);
                      }}
                    >
                      수락
                    </Button>
                    <Button
                      onClick={() => {
                        rejectRequest(req.sender.id);
                      }}
                    >
                      거절
                    </Button>
                  </MenuItem>
                );
              })
            )}
            <MenuItem component={Link} to="/User"></MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <NestedList drawerOpen={open} setDrawerOpen={handleDrawerOpen} />
        {/* <Divider /> */}
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}
        {/* <Grid className={classes.footer}> */}
        <Footer />
        {/* </Grid> */}
      </main>
    </div>
  );
}

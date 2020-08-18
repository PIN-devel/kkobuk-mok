import React, { useState, useContext, useEffect, useRef } from "react";
import clsx from "clsx";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Drawer from "@material-ui/core/Drawer";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AuthContext } from "../../contexts/AuthContext";
import NestedList from "../MyDash/listItems";
import Footer from "../Footer";
import useStyles from "./styles";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import localStorage from "local-storage";

import {
  Badge,
  Button,
  Divider,
  Toolbar,
  AppBar,
  Drawer,
  CssBaseline,
  Typography,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Menu,
  MenuItem,
  MenuList,
  Grid,
} from "@material-ui/core";

export default function Dashboard(props) {
  const { SERVER_URL, setAuth, setChannelIn } = useContext(AuthContext);
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const classes = useStyles();

  //Drawer
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  ////////////////////////

  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // 여기 header 유저 모양
  const [openAuth, setOpenAuth] = useState(false);
  const [openAuth2, setOpenAuth2] = useState(false);
  const anchorRef = useRef(null);
  const anchorRef2 = useRef(null);

  // const [anchorEl, setAnchorEl] = useState(null);
  // const [anchorEl2, setAnchorEl2] = useState(null);
  // const [wannaLogout, setWannaLogout] = useState(false);

  const handleToggle = () => {
    setOpenAuth((prevOpen) => !prevOpen);
  };
  const handleToggle2 = () => {
    setOpenAuth2((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenAuth(false);
  };
  const handleClose2 = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return;
    }
    setOpenAuth2(false);
  };
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenAuth(false);
    }
  };
  const handleListKeyDown2 = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenAuth2(false);
    }
  };
  const prevOpen = useRef(openAuth);
  const prevOpen2 = useRef(openAuth2);
  useEffect(() => {
    if (prevOpen.current === true && openAuth === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openAuth;

    if (prevOpen2.current === true && openAuth2 === false) {
      anchorRef2.current.focus();
    }
    prevOpen2.current = openAuth2;
  }, [openAuth, openAuth2]);

  // const handleClick = (event) => {
  //   setAnchorEl(event);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleClick2 = (e) => {
  //   setAnchorEl2(e);
  // };
  // const handleClose2 = () => {
  //   setAnchorEl2(null);
  // };

  const tester = () => {
    console.log(friendRequests);
  };

  // 친구요청
  const [friendRequests, setFriendRequests] = useState([]);

  const acceptRequest = (F_id) => {
    console.log("accepted");
    axios
      .post(`${SERVER_URL}/accounts/friend/${F_id}/accept/`, null, config)
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
    axios
      .post(`${SERVER_URL}//accounts/friend/${F_id}/reject/`, null, config)
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

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/accounts/friend/request/receive/`, config)
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
  ////////////////////////

  // 채널 나가기 고르아웃 때 해줘야해
  const exitChannel = () => {
    if (localStorage.get("myChannel")) {
      const channelId = localStorage.get("myChannel").id;
      const url = `${SERVER_URL}/rooms/${channelId}/`;
      const handleSetChannelIn = () => {
        localStorage.remove("myChannel");
        setChannelIn(null);
      };
      axios
        .delete(url, config)
        .then((res) => {
          handleSetChannelIn();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  // 로그아웃할 때, 쿠키와 로컬스토리지 날린다
  const Logout = () => {
    axios
      .post(`${SERVER_URL}/rest-auth/logout/`, config)
      .then((res) => {
        console.log(res);
        Cookies.remove("token");
        Cookies.remove("myUserId");
        exitChannel();
        setAuth(false);
        console.log("Logout success!!");
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <div className={classes.title}>
            <img
              src="/images/kkobuk_logo.png"
              alt="kkobuk"
              style={{ width: "100px", margin: "10px 0 0 0" }}
            />
          </div>
          {/* <Button
            onClick={() => {
              tester();
            }}
          >
            테스트
          </Button> */}

          <IconButton
            variant="contained"
            color="inherit"
            ref={anchorRef}
            aria-controls={openAuth ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <AccountCircleIcon />
          </IconButton>
          <Popper
            open={openAuth}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={openAuth}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem component={Link} to="/User">
                        <i class="fas fa-user-circle" style={{margin:"0 7px 0 0"}}></i>Profile
                      </MenuItem>
                      <MenuItem onClick={Logout}><i class="fas fa-sign-out-alt" style={{margin:"0 7px 0 0"}}></i>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <IconButton
            variant="contained"
            color="inherit"
            ref={anchorRef2}
            aria-controls={openAuth2 ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle2}
          >
            <Badge badgeContent={friendRequests.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popper
            open={openAuth2}
            anchorEl={anchorRef2.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose2}>
                    <MenuList
                      autoFocusItem={openAuth2}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown2}
                    >
                      {friendRequests.length === 0 ? (
                        <MenuItem onClick={handleClose2}>
                          <p style={{margin:"0"}}>친구 요청이 없습니다</p>
                        </MenuItem>
                      ) : (
                        friendRequests.map((req) => {
                          return (
                            <MenuItem>
                              <Grid container>
                                <Grid item xs={8}>
                                  <Typography variant="body1" align="center">
                                    {req.sender.name}admin님의 친구요청
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button
                                    color="primary"
                                    onClick={() => {
                                      acceptRequest(req.sender.id);
                                    }}
                                  >
                                    <i class="fas fa-check"></i>
                                  </Button>
                                </Grid>
                                <Grid item xs={2}>
                                  <Button
                                    color="secondary"
                                    onClick={() => {
                                      rejectRequest(req.sender.id);
                                    }}
                                  >
                                    <i class="fas fa-times"></i>
                                  </Button>
                                </Grid>
                              </Grid>
                            </MenuItem>
                          );
                        })
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
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

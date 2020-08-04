import React, { useState, useContext } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
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
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Dashboard(props) {
  const { setAuth } = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // 여기 header 유저 모양
  const [anchorEl, setAnchorEl] = useState(null);
  const [wannaLogout, setWannaLogout] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    setAuth(false);
    Cookies.remove("token");
    console.log("Logout Success!!!!!");
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

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            꼬북
          </Typography>

          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="contained"
            color="inherit"
            onClick={handleClick}
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
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </Menu>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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

import { makeStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1,
    padding: 30,
  },

  color: {
    background: "black",
  },

  center: {
    justifyContent: "center",
  },

  paper: {
    height: 340,
  },

  content: {
    padding: 2,
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "left",
  },

  head: {
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
  },

  mute: {
    color: "gray",
  },

  icon: {
    color: "#3f51b5",
  },
  cardTitle: {
    background: "linear-gradient(45deg, white, #17a2b8)",
    color: "white",
    height: "70px",
    "line-height": "70px",
  },
  cardHeader: {
    margin: "0",
    padding: "0",
    height: "600px",
  },
  cardBody: {
    padding: "36px",
  },
};

const useStyles = makeStyles(styles);

export default useStyles;

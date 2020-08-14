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
};

const useStyles = makeStyles(styles);

export default useStyles;

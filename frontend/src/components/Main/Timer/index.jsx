import React, { useState, useRef, useContext } from "react";
import DisplayComponent from "./DisplayComponent";
import { Grid, ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import Cookies from "js-cookie";
import { Wrapper } from "./styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const token = Cookies.get("token");
const config = {
  headers: {
    Authorization: `Jwt ${token}`,
  },
};

const Timer = (props) => {
  const { SERVER_URL } = useContext(AuthContext);
  const classes = useStyles();
  const [status, setStatus] = useState(0);
  // Not started = 0
  // started = 1
  // stopped = 2
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState("");
  const [stopwatch, setStopwatch] = useState({
    m: 0,
    h: 0,
    work: 0,
    break: 0,
    inf: false,
  });

  const scoreDataRef = useRef(props.scoreData);
  scoreDataRef.current = props.scoreData;

  const addScoreData = () => {
    axios
      .get(`${SERVER_URL}/accounts/maininfo`, config)
      .then((res) => {
        let now = new Date();
        let hours = now.getHours(); // 시
        let minutes = now.getMinutes(); // 분
        props.setScoreData([
          ...scoreDataRef.current,
          {
            time: `${hours}:${minutes}`,
            score: `${res.data.data.posture_level}`,
          },
        ]);
        console.log("성공");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("실패");
      });
  };
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    // axios.post(`${}/`)
    run();
    setStatus(1);
    setInterv(setInterval(run, 1000));
  };
  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    updatedS++;
    if (updatedS % 30 === 0) {
      addScoreData();
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    return setTime({
      s: updatedS,
      m: updatedM,
      h: updatedH,
    });
  };

  const stop = () => {
    clearInterval(interv);
    axios
      .post(`${SERVER_URL}/ 여기 url 아직 미정/`, config)
      .then((res) => {
        console.log(res);
        console.log("멈춤");
      })
      .catch((err) => {
        console.log(err.response);
      });
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setStopwatch({
      m: 0,
      h: 0,
      work: 0,
      break: 0,
      inf: false,
    });
    props.setScoreData([]); // 원래는 db에 해당 데이터를 보내주고 없애야 함
    setTime({ s: 0, m: 0, h: 0 });
  };

  const resume = () => start();
  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} className="timer">
          <DisplayComponent time={time} />
        </Grid>
        <Grid item xs={12} container spacing={2} className="">
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="Stopwatch-Hour-label">Hour</InputLabel>
              <Select
                labelId="Stopwatch-Hour-label"
                id="Stopwatch-Hour"
                value={stopwatch.h}
                onChange={(event) => {
                  setStopwatch({ ...stopwatch, h: event.target.value });
                }}
                label="Hour"
                disabled={status === 0 ? false : true}
              >
                <MenuItem value={0}>
                  <em>0</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="Stopwatch-Minute-label">Minute</InputLabel>
              <Select
                labelId="Stopwatch-Minute-label"
                id="Stopwatch-Minute"
                value={stopwatch.m}
                onChange={(event) => {
                  setStopwatch({ ...stopwatch, m: event.target.value });
                }}
                label="Minute"
                disabled={status === 0 ? false : true}
              >
                <MenuItem value={0}>
                  <em>0</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={55}>55</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="Stopwatch-Worktime-label">Work</InputLabel>
              <Select
                labelId="Stopwatch-Worktime-label"
                id="Stopwatch-Worktime"
                value={stopwatch.work}
                onChange={(event) => {
                  setStopwatch({ ...stopwatch, work: event.target.value });
                }}
                label="Work"
                disabled={status === 0 ? false : true}
              >
                <MenuItem value={0}>
                  <em>0</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={55}>55</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="Stopwatch-Break-label">Break</InputLabel>
              <Select
                labelId="Stopwatch-Break-label"
                id="Stopwatch-Break"
                value={stopwatch.break}
                onChange={(event) => {
                  setStopwatch({ ...stopwatch, break: event.target.value });
                }}
                label="Break"
                disabled={status === 0 && stopwatch.work !== 0 ? false : true}
              >
                <MenuItem value={0}>
                  <em>0</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={55}>55</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} className="buttons">
          {status === 0 ? (
            <Button
              variant="contained"
              color="primary"
              className="start-button"
              onClick={start}
            >
              Start
            </Button>
          ) : (
            ""
          )}

          {status === 1 ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                className="stop-button"
                onClick={stop}
              >
                Stop
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="reset-button"
                onClick={reset}
              >
                Reset
              </Button>
            </div>
          ) : (
            ""
          )}

          {status === 2 ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                className="resume-button"
                onClick={resume}
              >
                Resume
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="reset-button"
                onClick={reset}
              >
                Reset
              </Button>
            </div>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Timer;

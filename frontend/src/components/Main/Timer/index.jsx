import React, { useState, useContext, useEffect } from "react";
import DisplayComponent from "./DisplayComponent";
import { Grid } from "@material-ui/core";
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
import { MainContext } from "../../../contexts/MainContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Timer = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const {
    TotalTime,
    WorkTime,
    BreakTime,
    spentTime,
    currentStatus,
  } = useContext(MainContext);
  const classes = useStyles();
  const [mySpentHour, setMySpentHour] = useState(0);
  const [mySpentMin, setMySpentMin] = useState(0);
  const [mySpentSec, setMySpentSec] = useState(0);
  const [myTotalHour, setMyTotalHour] = useState(0);
  const [myTotalMin, setMyTotalMin] = useState(0);
  const [myWorkTime, setMyWorkTime] = useState(0);
  const [myBreakTime, setMyBreakTime] = useState(0);
  const [myStatus, setMystatus] = useState(1);

  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  useEffect(() => {
    const hour = parseInt(TotalTime / 60);
    const min = TotalTime % 60;
    setMystatus(currentStatus);
    setMyTotalHour(hour);
    setMyTotalMin(min);
    setMyWorkTime(WorkTime);
    setMyBreakTime(BreakTime);
  }, [spentTime]);

  useEffect(() => {
    const hour = parseInt(spentTime / 3600);
    const min = parseInt(spentTime / 60);
    const sec = spentTime % 60;
    setMySpentHour(hour);
    setMySpentMin(min);
    setMySpentSec(sec);
  }, [spentTime]);

  const handleMyTotalHour = (e) => {
    setMyTotalHour(e);
  };

  const handleMyTotalMin = (e) => {
    setMyTotalMin(e);
  };

  const handleMyWorkTime = (e) => {
    setMyWorkTime(e);
  };

  const handleMyBreakTime = (e) => {
    setMyBreakTime(e);
  };

  const start = () => {
    const body = {
      total_time: myTotalHour * 60 + myTotalMin,
      work_time: myWorkTime,
      break_time: myBreakTime,
    };
    axios
      .post(`${SERVER_URL}/accounts/timer/start/`, body, config)
      .then((res) => {
        console.log("시작!");
        console.log(res);
        setMystatus(2);
      })
      .catch((err) => {
        console.log("시작실패");
        console.log(err.response);
      });
  };

  const stop = () => {
    axios
      .post(`${SERVER_URL}/accounts/timer/pause/`, null, config)
      .then((res) => {
        console.log("일시정지!");
        console.log(res);
        setMystatus(4);
      })
      .catch((err) => {
        console.log("일시정지 실패");
        console.log(err.response);
      });
  };

  const resume = () => {
    axios
      .post(`${SERVER_URL}/accounts/timer/restart/`, null, config)
      .then((res) => {
        console.log("다시 시작!");
        console.log(res);
        setMystatus(2);
      })
      .catch((err) => {
        console.log("다시 시작 실패");
        console.log(err.response);
      });
  };

  const reset = () => {
    axios
      .post(`${SERVER_URL}/accounts/timer/stop/`, null, config)
      .then((res) => {
        console.log("종료!");
        console.log(res);
        setMystatus(1);
      })
      .catch((err) => {
        console.log("종료 실패");
        console.log(err.response);
      });
  }; // 완전정지

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} className="timer">
          <DisplayComponent
            hour={mySpentHour}
            min={mySpentMin}
            sec={mySpentSec}
          />
        </Grid>
        <Grid item xs={12} container spacing={2} className="">
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="Stopwatch-Hour-label">Hour</InputLabel>
              <Select
                labelId="Stopwatch-Hour-label"
                id="Stopwatch-Hour"
                value={myTotalHour}
                onChange={(event) => {
                  handleMyTotalHour(event.target.value);
                }}
                label="Hour"
                disabled={currentStatus === 1 ? false : true}
              >
                <MenuItem value={0}>0</MenuItem>
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
                value={myTotalMin}
                onChange={(event) => {
                  handleMyTotalMin(event.target.value);
                }}
                label="Min"
                disabled={currentStatus === 1 ? false : true}
              >
                <MenuItem value={0}>0</MenuItem>
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
                value={myWorkTime}
                onChange={(event) => {
                  handleMyWorkTime(event.target.value);
                }}
                label="Work"
                disabled={currentStatus === 1 ? false : true}
              >
                <MenuItem value={0}>0</MenuItem>
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
                value={myBreakTime}
                onChange={(event) => {
                  handleMyBreakTime(event.target.value);
                }}
                label="Break"
                disabled={currentStatus === 1 ? false : true}
              >
                <MenuItem value={0}>0</MenuItem>
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
          {currentStatus === 1 ? (
            <Button
              variant="contained"
              color="primary"
              className="start-button"
              onClick={() => {
                start();
              }}
            >
              Start
            </Button>
          ) : (
            ""
          )}

          {currentStatus === 2 ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                className="stop-button"
                onClick={() => {
                  stop();
                }}
              >
                Stop
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="reset-button"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </Button>
            </div>
          ) : (
            ""
          )}
          {currentStatus === 3 ? <h3>휴식시간</h3> : ""}

          {currentStatus === 4 ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                className="resume-button"
                onClick={() => {
                  resume();
                }}
              >
                Resume
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="reset-button"
                onClick={() => {
                  reset();
                }}
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

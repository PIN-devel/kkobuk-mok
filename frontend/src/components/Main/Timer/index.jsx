import React, { useState, useRef } from "react";
import DisplayComponent from "./DisplayComponent";
import BtnComponent from "./BtnComponent";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  const classes = useStyles();
  const [status, setStatus] = useState(0);
  // Not started = 0
  // started = 1
  // stopped = 2
  const [scoreData, setScoreData] = useState([]);
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [stopwatch, setStopwatch] = useState({
    m: 0,
    h: 0,
    work: 0,
    break: 0,
    inf: false,
  });
  const [auth, setAuth] = useState(false); //  !auth 면 redirect 시켜버리자
  const [channelIn, setChannelIn] = useState(null);
  const [curScore, setCurScore] = useState(58);
  const [curHumid, setCurHumid] = useState(65);

  const scoreDataRef = useRef(scoreData);
  scoreDataRef.current = scoreData;

  const addScoreData = () => {
    let now = new Date();
    let hours = now.getHours(); // 시
    let minutes = now.getMinutes(); // 분
    setScoreData([
      ...scoreDataRef.current,
      { time: `${hours}:${minutes}`, score: `${30}` },
    ]);
  };
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };
  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    updatedS++;
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
      if (updatedM % 2 == 0) {
        addScoreData();
      }
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
    setScoreData([]); // 원래는 db에 해당 데이터를 보내주고 없애야 함
    setTime({ s: 0, m: 0, h: 0 });
  };

  const resume = () => start();
  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time={time} />
          <form>
            <Grid container spacing={4} className="">
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
            </Grid>
          </form>
          <BtnComponent
            status={status}
            resume={resume}
            reset={reset}
            stop={stop}
            start={start}
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;

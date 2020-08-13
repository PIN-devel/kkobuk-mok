import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "./styles";
import { MainContext } from "../../../contexts/MainContext";
import { AuthContext } from "../../../contexts/AuthContext";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Button, TextField } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Cookies from "js-cookie";

const HControl = () => {
  const {
    isAuto,
    setIsAuto,
    DeHumid,
    setDeHumid,
    isSilent,
    setIsSilent,
    isHumidiOn,
    setIsHumidiOn,
  } = useContext(MainContext);

  const { SERVER_URL } = useContext(AuthContext);
  const [myDeHumid, setMyDeHumid] = useState(0);

  const token = Cookies.get("token");
  const userID = Cookies.get("myUserId");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  const handleAuto = (bool) => {
    axios
      .put(`${SERVER_URL}/accounts/${userID}/`, { auto_setting: bool }, config)
      .then((res) => {
        console.log(res);
        if (bool) {
          console.log("자동 온!");
        } else {
          console.log("자동 오프!");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("자동 변경 실패");
      });
  };

  const handleSound = (bool) => {
    console.log(bool);
    axios
      .put(`${SERVER_URL}/accounts/${userID}/`, { slient_mode: bool }, config)
      .then((res) => {
        console.log(res);
        if (bool) {
          console.log("소리 오프!");
        } else {
          console.log("소리 온!");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("소리 변경 실패");
      });
  };

  const handleDeHumid = (deH) => {
    setMyDeHumid(deH);
  };

  const handleHumidi = (bool) => {
    axios
      .put(
        `${SERVER_URL}/accounts/${userID}/`,
        { humidifier_on_off: bool },
        config
      )
      .then((res) => {
        console.log(res);
        if (bool) {
          console.log("가습기 온!");
        } else {
          console.log("가습기 오프!");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("가습기 상태 변경 실패");
      });
  };

  const submitDeHumid = () => {
    const newV = myDeHumid;
    axios
      .put(
        `${SERVER_URL}/accounts/${userID}/`,
        { desired_humidity: newV },
        config
      )
      .then((res) => {
        console.log(res);
        console.log("습도 설정 성공");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("습도 설정 실패");
      });
  };

  useEffect(() => {
    setMyDeHumid(DeHumid);
  }, []);

  return (
    <Wrapper>
      <FormControl component="fieldset">
        <FormLabel className="nameOf" component="legend">
          알림 소리
        </FormLabel>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch
                checked={!isSilent}
                onChange={(e) => {
                  setIsSilent(!isSilent);
                  handleSound(!e.target.checked);
                }}
              />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
        </Typography>
        <FormLabel className="nameOf" component="legend">
          자동 가습
        </FormLabel>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch
                checked={isAuto}
                color="primary"
                onChange={(e) => {
                  setIsAuto(!isAuto);
                  handleAuto(e.target.checked);
                }}
              />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
        </Typography>
        <FormLabel className="nameOf" component="legend">
          희망 습도
        </FormLabel>
        <Grid container>
          <Grid item xs={8}>
            <input
              type="number"
              name="DeHumid"
              min="0"
              max="100"
              defaultValue={DeHumid}
              className="HInput"
              onChange={(e) => {
                handleDeHumid(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => {
                submitDeHumid();
              }}
            >
              설정
            </Button>
          </Grid>
        </Grid>

        <FormLabel className="nameOf" component="legend">
          가습기
        </FormLabel>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch
                disabled={isAuto}
                checked={isHumidiOn}
                onChange={(e) => {
                  setIsHumidiOn(!isHumidiOn);
                  handleHumidi(e.target.checked);
                }}
              />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
        </Typography>
      </FormControl>
    </Wrapper>
  );
};

export default HControl;

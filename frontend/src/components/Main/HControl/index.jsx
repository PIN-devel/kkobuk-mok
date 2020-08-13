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
        alert("습도가 설정되었습니다");
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

  const styles = {
    root: {
      height: 500,
      width: 200,
    },
  };

  return (
    <Wrapper>
      <FormControl component="fieldset">
        <Grid container>
          <Grid item xs={6} container className="4boxes">
            <Grid item xs={12} className="titles">
              <h3>자동 가습</h3>
            </Grid>
            <Grid item xs={2} className="offW">
              <h3>off</h3>
            </Grid>
            <Grid item xs={8} className="mySwitch">
              <Switch
                checked={isAuto}
                color="primary"
                onChange={(e) => {
                  setIsAuto(!isAuto);
                  handleAuto(e.target.checked);
                }}
              />
            </Grid>
            <Grid item xs={2} className="onW">
              <h3>on</h3>
            </Grid>
          </Grid>
          <Grid item xs={6} container className="4boxes">
            <Grid item xs={12} className="titles">
              <h3>희망 습도</h3>
            </Grid>
            <Grid item xs={8} className="myInputBox">
              <input
                type="number"
                name="DeHumid"
                min="0"
                size="50"
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
                variant="contained"
                color="primary"
                onClick={() => {
                  submitDeHumid();
                }}
              >
                설정
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6} container className="4boxes">
            <Grid item xs={12} className="titles">
              <h3>가습기</h3>
            </Grid>
            <Grid item xs={2} className="offW">
              <h3>off</h3>
            </Grid>
            <Grid item xs={8} className="mySwitch">
              <Switch
                disabled={isAuto}
                checked={isHumidiOn}
                onChange={(e) => {
                  setIsHumidiOn(!isHumidiOn);
                  handleHumidi(e.target.checked);
                }}
              />
            </Grid>
            <Grid item xs={2} className="onW">
              <h3>on</h3>
            </Grid>
          </Grid>
          <Grid item xs={6} container className="4boxes">
            <Grid item xs={12} className="titles">
              <h3>알림 소리</h3>
            </Grid>
            <Grid item xs={2} className="offW">
              <h3>off</h3>
            </Grid>
            <Grid item xs={8} className="mySwitch">
              <Switch
                checked={!isSilent}
                onChange={(e) => {
                  setIsSilent(!isSilent);
                  handleSound(!e.target.checked);
                }}
              />
            </Grid>
            <Grid item xs={2} className="onW">
              <h3>on</h3>
            </Grid>
          </Grid>
        </Grid>
      </FormControl>
    </Wrapper>
  );
};

export default HControl;

import React, { useContext, useEffect, useState } from "react";
import { Wrapper, TurtleSign } from "./styles";
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
import SleepT from "../../../assets/sleepboard.png";
import ReadyT from "../../../assets/readyboard.png";
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
    initialTheme,
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
    if (bool && isHumidiOn) {
      setIsHumidiOn(false);
      handleHumidi(false);
    }
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
      .put(`${SERVER_URL}/accounts/${userID}/`, { silent_mode: bool }, config)
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
    if (isNaN(deH)) {
      alert("숫자만 입력 가능합니다");
    } else {
      setMyDeHumid(deH);
    }
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
    const newV = Number(myDeHumid);
    axios
      .put(
        `${SERVER_URL}/accounts/${userID}/`,
        { desired_humidity: newV },
        config
      )
      .then((res) => {
        alert("희망 습도가 설정되었습니다");
        console.log(res);
        console.log("습도 설정 성공");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("습도 설정 실패");
      });
  };

  const handleMuTheme = (sel) => {
    axios
      .post(`${SERVER_URL}/accounts/theme/change/`, { theme: sel }, config)
      .then((res) => {
        console.log("테마변경 성공");
        console.log(res);
      })
      .catch((err) => {
        console.log("테마변경 실패");
        console.log(err.response);
      });
  };

  useEffect(() => {
    setMyDeHumid(DeHumid);
  }, []);

  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12}>
          <TurtleSign src={SleepT} />
        </Grid>
        <Grid container className="happy">
          <Grid item xs={4} container className="3boxes">
            <Grid item xs={12} className="titles topL">
              <h3>자동 가습</h3>
            </Grid>
            <Grid item xs={12} className="mySwitch">
              <div className="theSwitch">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isAuto}
                    onChange={(e) => {
                      setIsAuto(!isAuto);
                      handleAuto(e.target.checked);
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={4} container className="3boxes">
            <Grid item xs={12} className="titles">
              <h3 className="myTitleW">가습기</h3>
            </Grid>
            <Grid item xs={12} className="mySwitch">
              <div className="theSwitch">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isHumidiOn}
                    disabled={isAuto}
                    onChange={(e) => {
                      setIsHumidiOn(!isHumidiOn);
                      handleHumidi(e.target.checked);
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={4} container className="3boxes">
            <Grid item xs={12} className="titles topR">
              <h3>알림</h3>
            </Grid>
            <Grid item xs={12} className="mySwitch">
              <div className="theSwitch">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!isSilent}
                    onChange={(e) => {
                      setIsSilent(!isSilent);
                      handleSound(!e.target.checked);
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={6} container className="2boxes">
            <Grid item xs={12} className="titles">
              <h3>희망 습도</h3>
            </Grid>
            <Grid item xs={12} className="SelBox">
              <div className="NumBox">
                <input
                  type="text"
                  className="SpecialOne"
                  value={myDeHumid}
                  maxLength={2}
                  onChange={(e) => {
                    handleDeHumid(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="SpecialButton"
                  onClick={() => {
                    submitDeHumid();
                  }}
                >
                  적용
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={6} container className="2boxes">
            <Grid item xs={12} className="titles">
              <h3>알림 테마</h3>
            </Grid>
            <Grid item xs={12} className="SelBox">
              <div className="ThemeBox">
                <select
                  id="myTheme"
                  defaultValue={initialTheme}
                  onChange={(e) => {
                    handleMuTheme(e.target.value);
                  }}
                >
                  <option value={1}>공포</option>
                  <option value={2}>유머</option>
                  <option value={3}>뭐있나</option>
                  <option value={4}>몰라</option>
                </select>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default HControl;

import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "./styles";
import { MainContext } from "../../../contexts/MainContext";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Button, TextField } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Cookies from "js-cookie";

const HControl = () => {
  const {
    isAuto,
    setIsAuto,
    DeHumid,
    setDeHumid,
    isSoundOn,
    setIsSoundOn,
  } = useContext(MainContext);
  const [myHumid, setMyHu] = useState(0);

  const token = Cookies.get("token");
  const userID = Cookies.get("myUserId");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };

  const handleAuto = () => {
    const newV = !isAuto;
    setIsAuto(newV);
  };

  const handleSound = () => {
    const newV = !isSoundOn;
    setIsSoundOn(newV);
  };

  const changeH = (e) => {};

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <FormControl component="fieldset">
        <FormLabel component="legend">알림 소리</FormLabel>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch
                checked={isSoundOn}
                onChange={() => {
                  handleSound();
                }}
              />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
        </Typography>
        <FormLabel component="legend">자동 가습</FormLabel>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch
                checked={isAuto}
                onChange={() => {
                  handleAuto();
                }}
              />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
        </Typography>
        <FormLabel component="legend">희망 습도</FormLabel>
        {/* <TextField
          id="birth"
          type="date"
          name="birth"
          defaultValue="2000-01-01"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            handleSetBirthDate(e.target.value);
          }}
        /> */}
        <Button disabled={isAuto}>가습기 작동</Button>
      </FormControl>
    </Wrapper>
  );
};

export default HControl;

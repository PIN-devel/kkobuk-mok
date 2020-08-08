import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "./styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

const Temperature = (props) => {
  const tempRef = useRef(props.temperature);
  tempRef.current = props.temperature;
  const [myTemp, setMyTemp] = useState(props.temperature);
  useEffect(() => {
    setMyTemp(tempRef.current);
  }, [props.temperature]);
  return (
    <Wrapper>
      <Typography id="discrete-slider-always" gutterBottom>
        온도
      </Typography>
      <Slider
        defaultValue={tempRef.current}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Wrapper>
  );
};

export default Temperature;

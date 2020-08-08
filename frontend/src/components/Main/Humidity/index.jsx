import React from "react";
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
    label: "0%",
  },
  {
    value: 100,
    label: "100%",
  },
];

function valuetext(value) {
  return `${value}%`;
}

const Humidity = (props) => {
  return (
    <Wrapper>
      <Typography id="discrete-slider-always" gutterBottom>
        습도
      </Typography>
      <Slider
        defaultValue={props.humidity}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Wrapper>
  );
};

export default Humidity;

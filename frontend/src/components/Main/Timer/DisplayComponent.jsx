import React from "react";

function DisplayComponent(props) {
  return (
    <div>
      <span>{props.hour >= 10 ? props.hour : "0" + props.hour}</span>
      &nbsp;:&nbsp;
      <span>{props.min >= 10 ? props.min : "0" + props.min}</span>
      &nbsp;:&nbsp;
      <span>{props.sec >= 10 ? props.sec : "0" + props.sec}</span>
    </div>
  );
}

export default DisplayComponent;

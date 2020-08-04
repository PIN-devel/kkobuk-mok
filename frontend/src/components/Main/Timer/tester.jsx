import React, { useState, useEffect, useRef } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import _ from "lodash";

const TABLE_LIST_1 = [{ x: 0, y: 0 }];

export default function Chart() {
  const [list1, setlist1] = useState([...TABLE_LIST_1]);
  const [sampling, setsampling] = useState(false);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (sampling) {
      let result = _.cloneDeep(list1);
      result.push({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
      });
      console.log(result);
      setlist1(result);
    }
  }, 1000);

  const start = () => {
    let result = sampling;
    setsampling(!result);
  };

  return (
    <div>
      <ScatterChart
        width={600}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey={"x"} />
        <YAxis type="number" dataKey={"y"} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="values"
          data={list1}
          fill="#8884d8"
          line
          shape="circle"
        />
      </ScatterChart>
      <button onClick={start}>
        {sampling ? "Stop sampling" : "Start sampling"}
      </button>
    </div>
  );
}

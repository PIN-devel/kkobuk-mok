import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Wrapper } from "./styles";
import { Grid } from "@material-ui/core";

const data = [
  {
    name: "01-03",
    score: 50,
  },
  {
    name: "01-04",
    score: 55,
  },
  {
    name: "01-05",
    score: 80,
  },
  {
    name: "01-06",
    score: 72,
  },
  {
    name: "01-07",
    score: 65,
  },
  {
    name: "01-08",
    score: 44,
  },
  {
    name: "01-09",
    score: 76,
  },
];

class Graphs extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/q4eonc12/";
  render() {
    return (
      <Wrapper>
        <Grid container>
          <Grid item xs={12}>
          <h1>최근 7일의 점수</h1>
          </Grid>
        </Grid>
        <Grid xs={12}>
        <ResponsiveContainer height={240} width="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
            barSize={30}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 30, right: 30 }}
            />
            <YAxis type="number" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="score" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
        </Grid>
      </Wrapper>
    );
  }
}

export default Graphs;

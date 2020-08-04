import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Progress = () => {
  const [scoreData, setScoreData] = useState(58);
  useEffect(() => {}, [scoreData]);
  return (
    <ResponsiveContainer height={260} width="90%">
      <LineChart
        data={scoreData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis type="number" domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Progress;

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function CalculatorGraph({ data, xKey, yKeys, colors }) {
  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {yKeys.map((key, i) => (
        <Line key={key} type="monotone" dataKey={key} stroke={colors[i % colors.length]} />
      ))}
    </LineChart>
  );
}

export default CalculatorGraph;
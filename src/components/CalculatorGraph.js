import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function CalculatorGraph({ data, graphData }) {
  {
    console.log("graph objec", graphData);
  }
  return (
    <LineChart width={graphData.width} height={graphData.height} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={graphData.xKey} />
      <YAxis
        type="number"
        tickFormatter={(value) =>
          new Intl.NumberFormat("en-US", {
            notation: "compact",
            compactDisplay: "short",
          }).format(value)
        }
        domain={[(dataMin) => dataMin, (dataMax) => dataMax * 2]}
      />
      <Line
        type="monotone"
        dataKey="interest"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Tooltip />
      <Legend />
      {graphData.yKeys.map((key, i) => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={graphData.colors[i % graphData.colors.length]}
        />
      ))}
    </LineChart>
  );
}

export default CalculatorGraph;

// import React, { useState, useEffect } from 'react';
// import * as d3 from 'd3';
// import { Line } from 'recharts';

// const DynamicCalculator = ({ data }) => {
//   const [xScale, setXScale] = useState(d3.scaleLinear());
//   const [yScale, setYScale] = useState(d3.scaleLinear());

//   const calculateScales = () => {
//     const xValues = Array.from(data, d => d.x);
//     const yValues = Array.from(data, d => d.y);
  
//     const xScale = d3.scaleLinear().domain([Math.min(...xValues), Math.max(...xValues)]);
//     const yScale = d3.scaleLinear().domain([Math.min(...yValues), Math.max(...yValues)]);
  
//     setXScale(xScale);
//     setYScale(yScale);
//   };

//   useEffect(() => {
//     calculateScales();
//   }, [data]);

//   const renderLine = () => {
//     return (
//       <Line
//         data={data}
//         xScale={xScale}
//         yScale={yScale}
//         margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//       />
//     );
//   };

//   const calculateResult = () => {
//     const principle = parseFloat(data.principle);
//     const rate = parseFloat(data.rate) / 100;
//     const time = parseFloat(data.time);
//     const compoundInterval = parseFloat(data.compoundInterval);

//     const result = principle * Math.pow(1 + rate, (compoundInterval * time)) - principle;

//     return result;
//   };

//   return (
//     <div>
//       <h2>{data.name}</h2>
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Value</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.inputs.map((input, i) => (
//               <tr key={i}>
//                 <td>{input.label}</td>
//                 <td>{input.value}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div>
//         <h3>Result</h3>
//         <h4>{data.resultName}: {calculateResult()}</h4>
//       </div>
//       {data.isGraph && (
//         <div>
//           <h3>Graph</h3>
//           {renderLine()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DynamicCalculator;
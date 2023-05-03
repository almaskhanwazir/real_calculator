import { useState } from 'react';
import Layout from '../../components/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';

const options = {
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
        displayFormats: {
          day: 'MMM D'
        }
      },
      ticks: {
        source: 'auto',
        autoSkip: true,
        maxTicksLimit: 20,
      },
      adapters: {
        time: {
          id: 'time',
          options: {
            parser: 'timestamp',
            tooltipFormat: 'll HH:mm',
          },
        },
      },
    },
    y: {
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 10,
        precision: 2,
      },
    },
  },
};

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [time, setTime] = useState(0);
  const [result, setResult] = useState(0);
  const [chartData, setChartData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const rate = interestRate / 100;
    let amount = principal;
    let interest = 0;
    const data = [];
    data.push(principal);

    for (let i = 1; i <= time; i++) {
      amount = amount * (1 + rate);
      interest = amount - principal;
      data.push(interest.toFixed(2));
    }
debugger
    setResult(interest.toFixed(2));
    setChartData(getChartData(data));
  };

  const getChartData = (data) => {
    return data.map((d, i) => ({
      name: format(new Date(Date.now() + i * 24 * 60 * 60 * 1000), 'MMM d'),
      interest: d,
    }));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Compound Interest Calculator</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="principal" className="block font-bold mb-2">Principal</label>
            <input
              type="number"
              id="principal"
              className="w-full border border-gray-400 p-2 rounded"
              value={principal}
              onChange={(event) => setPrincipal(parseFloat(event.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="interestRate" className="block font-bold mb-2">Interest Rate</label>
            <input
              type="number"
              id="interestRate"
              className="w-full border border-gray-400 p-2 rounded"
              value={interestRate}
              onChange={(event) => setInterestRate(parseFloat(event.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block font-bold mb-2">Time (years)</label>
            <input
              type="number"
              id="time"
              className="w-full border border-gray-400 p-2 rounded"
              value={time}
              onChange={(event) => setTime(parseFloat(event.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Calculate</button>
          </div>
        </form>
        {result > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Result</h2>
            <p>The interest is {result}</p>
            <LineChart width={600} height={400} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="interest" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompoundInterest;
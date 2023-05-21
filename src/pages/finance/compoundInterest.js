import { useState } from 'react';
import { connect } from 'react-redux';
import { changeTheme } from '../../redux/calculatorActions';
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

const CompoundInterest = ({ calculatorTheme, changeTheme }) => {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [time, setTime] = useState(0);
  const [result, setResult] = useState(0);
  const [chartData, setChartData] = useState({});
  const { backgroundColor, textColor } = calculatorTheme;
  const [isDarkMode, setIsDarkMode] = useState(false);
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

    setResult(interest.toFixed(2));
    setChartData(getChartData(data));
  };

  const getChartData = (data) => {
    return data.map((d, i) => ({
      name: format(new Date(Date.now() + i * 24 * 60 * 60 * 1000), 'MMM d'),
      interest: d,
    }));
  };

  const handleThemeChange = () => {
    const newBackgroundColor = backgroundColor === 'white' ? 'black' : 'white';
    const newTextColor = textColor === 'black' ? 'white' : 'black';
    setIsDarkMode(!isDarkMode);
    changeTheme({ backgroundColor: newBackgroundColor, textColor: newTextColor });
  };

  return (

    <div id="compoundInterest" className="max-w-2xl mx-auto px-4" style={{ backgroundColor, color: textColor }}>

      <h1 className="text-3xl font-bold mb-4">Compound Interest Calculator</h1>
      {/* <button onClick={handleThemeChange} className={`bg-${isDarkMode ? 'gray-200' : 'blue-500'} ml-8 text-white py-2 px-4 rounded hover:bg-${isDarkMode ? 'gray-500' :'blue-600'}`}>Toggle Theme</button> */}

      <div className={`border-double border-4 border-${textColor}-600 flex float-right`}>

        <p class="yy">Dark Theme</p>
        <label class="ml-4 inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDarkMode}
            readOnly
          />
          <div
            onClick={() => {
              handleThemeChange(!isDarkMode);
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
          <span className="ml-2 text-sm font-medium text-gray-900">
            ON
                    </span>
        </label>


      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <span htmlFor="principal" className="block font-bold mb-2">Principal</span>
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
          <span htmlFor="interestRate" className="block font-bold mb-2">Interest Rate</span>
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
          <span htmlFor="time" className="block font-bold mb-2">Time (years)</span>
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

  );
};

const mapStateToProps = (state) => ({
  calculatorTheme: state.calculator.calculatorTheme
});

const mapDispatchToProps = {
  changeTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(CompoundInterest);
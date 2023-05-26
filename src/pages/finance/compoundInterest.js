import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changeTheme } from '../../reduxStore/calculatorActions';
import DynamicCalculator from '../../components/DynamicCalculator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';
const calculator =
{
  name: "Compound Interest Calculator",
  inputs: [
    { name: "principle", type: "number", label: "Principle", value: "" },
    { name: "rate", type: "number", label: "Rate of interest", value: "" },
    { name: "time", type: "number", label: "Time period", value: "" },
    {
      name: "compoundInterval",
      type: "number",
      label: "Compounding interval (in months)",
      value: "",
    },
  ],
  formula:
    "principle * Math.pow(1 + (rate / (compoundInterval * 100)), (compoundInterval * time)) - principle",
  resultName: "Compound Interest",
  isGraph: true
};
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
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const rate = interestRate / 100;
  //   let amount = principal;
  //   let interest = 0;
  //   const data = [];
  //   data.push(principal);

  //   for (let i = 1; i <= time; i++) {
  //     amount = amount * (1 + rate);
  //     interest = amount - principal;
  //     data.push(interest.toFixed(2));
  //   }

  //   setResult(interest.toFixed(2));
  //   setChartData(getChartData(data));
  // };

  // const getChartData = (data) => {
  //   return data.map((d, i) => ({
  //     name: format(new Date(Date.now() + i * 24 * 60 * 60 * 1000), 'MMM d'),
  //     interest: d,
  //   }));
  // };

  // const handleThemeChange = () => {
  //   const newBackgroundColor = backgroundColor === 'white' ? 'black' : 'white';
  //   const newTextColor = textColor === 'black' ? 'white' : 'black';
  //   setIsDarkMode(!isDarkMode);
  //   changeTheme({ backgroundColor: newBackgroundColor, textColor: newTextColor });
  // };

  return (

    <div id="compoundInterest" className="max-w-2xl mx-auto px-4" style={{ backgroundColor }}>

      <DynamicCalculator data={calculator}/>
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
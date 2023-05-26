import { useState, useEffect  } from 'react';
import { connect } from 'react-redux';
import { changeTheme } from '../../reduxStore/calculatorActions';
import CalculatorGraph from '../../components/CalculatorGraph';
import staticData from '../../components/staticData';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
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


const dynamicCalculatorPage = ({ calculatorTheme, changeTheme }) => {
  const router = useRouter();
  const { backgroundColor, textColor } = calculatorTheme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [results, setResults] = useState({});
  
  const [formData, setFormData] = useState({});
  const [calculatorData, setCalculatorData] = useState({});
  
  const calculate = (event) => {
    const { formula, resultName } = calculator;
    event.preventDefault();
    const expression = formula.replace(
      /(\w+)/g,
      (match) => formData[match] || match
    );
    const res = eval(expression)
    
    setResults(prevState => ({ ...prevState, [resultName]: res }));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cal = urlParams.get('cal');
    var allCalculatorsData = staticData.allCalculators
    const curentCalculator = allCalculatorsData.find(d => d.id === cal);
    setCalculatorData(curentCalculator);
  },[0]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })

  };

  const renderInputField = (input, index) => {
    switch (input.type) {
      case "text":
      case "number":
        return (
          <div className="mb-4">
            <span htmlFor={input.name} style={{ color: textColor }} className="block font-bold mb-2">{input.label}</span>
            <input
              className="w-full border border-gray-400 p-2 rounded"
              type={input.type}
              name={input.name}
              onChange={(e) => handleInputChange(e, index)}
              value={formData[input.name] || ""}
            />
          </div>
        );
      // case "dropdown":
      //   return (
      //     <div key={index}>
      //       <label htmlFor={input.name}>{input.label}</label>
      //       <select
      //         name={input.name}
      //         onChange={(e) => handleInputChange(e, index)}
      //       >
      //         {input.options.map((option, optionIndex) => (
      //           <option key={optionIndex} value={option}>
      //             {option}
      //           </option>
      //         ))}
      //       </select>
      //     </div>
      //   );
      // case "checkbox":
      //   return (
      //     <div key={index}>
      //       <input
      //         type={input.type}
      //         name={input.name}
      //         onChange={(e) => handleInputChange(e, index)}
      //         checked={input.value || false}
      //       />
      //       <label htmlFor={input.name}>{input.label}</label>
      //     </div>
      //   );
      default:
        return null;
    }
  };

  const handleThemeChange = () => {
    const newBackgroundColor = backgroundColor === 'white' ? 'black' : 'white';
    const newTextColor = textColor === 'black' ? 'white' : 'black';
    setIsDarkMode(!isDarkMode);
    changeTheme({ backgroundColor: newBackgroundColor, textColor: newTextColor });
  };

  return (

    <div id="compoundInterest" className="max-w-2xl mx-auto px-4" style={{ backgroundColor }}>
      <h1 className="text-3xl font-bold mb-4" style={{ color: textColor }}>{calculatorData.name}</h1>
      <div className={`border-double border-4 border-${textColor}-600 flex float-right`}>

        <p style={{ color: textColor }} class="yy">Dark Theme</p>
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
          <span className="ml-2 text-sm font-medium text-gray-900">ON</span>
        </label>


      </div>
      <form >
        {calculatorData.inputs && calculatorData.inputs.map((input, inputIndex) => renderInputField(input, inputIndex))}
        <div className="mb-4">
          <button onClick={(e) => calculate(e)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Calculate</button>
        </div>
        {results[calculatorData.resultName] && (

          // <div className="mb-4">
          //   <span htmlFor="result" style={{ color: textColor }} className="block font-bold mb-2">"Result"</span>
          //   <input
          //     type={"text"}
          //     name={"result"}
          //     className="w-full border border-gray-400 p-2 rounded"
          //     value={results[calculatorData.resultName]}

          //     disabled
          //   />
          // </div>
          <div>
            <h2 style={{ color: textColor }} className="text-xl font-bold mb-2">Result</h2>
            <p style={{ color: textColor }}>{results[calculatorData.resultName]}</p>
            {/* {calculatorData.isGraph && (
              <CalculatorGraph
                inputs={inputsData}
                formula={calculatorData.formula}
                result={result[calculatorData.resultName]}
                xLabel={calculatorData.xLabel}
                yLabel={calculatorData.yLabel}
                title={calculatorData.graphTitle}
              />
            )} */}
          </div>
        )}
      </form>
    </div >

  );
};

const mapStateToProps = (state) => ({
  calculatorTheme: state.calculator.calculatorTheme
});

const mapDispatchToProps = {
  changeTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(dynamicCalculatorPage);
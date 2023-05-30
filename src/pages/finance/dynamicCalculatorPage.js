import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changeTheme } from '../../reduxStore/calculatorActions';
import CalculatorGraph from '../../components/CalculatorGraph';
import staticData from '../../components/staticData';

const DynamicCalculatorPage = ({ calculatorTheme, changeTheme }) => {
  const { backgroundColor, textColor } = calculatorTheme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [results, setResults] = useState({});

  const [formData, setFormData] = useState({});
  const [calculatorData, setCalculatorData] = useState({});

  const calculate = (event) => {
    const { formula, resultName } = calculatorData;
    const allInputs = calculatorData.inputs;

    event.preventDefault();
    const formValues = calculatorData.inputs.reduce((obj, item) => {
      if (item.type === "array") {
        obj[item.name] = item.value.map((cf) => cf.amount);
      } else {
        obj[item.name] = item.value;
      }
      return obj;
    }, {});

    const expression = formula.replace(
      /(\w+)/g,
      (match) => formValues[match] || match
    );

    const res = Number(eval(expression));

    setResults(prevState => ({ ...prevState, [resultName]: res }));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cal = urlParams.get('cal');
    
    var allCalculatorsData = staticData.allCalculators
    const curentCalculator = allCalculatorsData.find(d => d.id === cal);
    setCalculatorData(curentCalculator);
  }, [0]);

  const handleArrayInputChange = (e, inputIndex, cashFlowIndex) => {
    const { name, value } = e.target;
    const currentInput = calculatorData.inputs[inputIndex].value[cashFlowIndex];
    currentInput.amount = value;
    calculatorData.inputs[inputIndex].value = calculatorData.inputs[inputIndex].value.map((d, i) => {
      if (i !== cashFlowIndex) {
        return d;
      } else {
        return currentInput;
      }
    });
    setCalculatorData(calculatorData);

    const cashFlows = calculatorData.inputs[inputIndex].value.map((cf) => cf.amount);
    setFormData({
      ...formData,
      [name]: cashFlows,
    });
  };

  const addCashFlow = (event, inputName) => {
    event.preventDefault();
    const inputIndex = calculatorData.inputs.findIndex(
      (input) => input.name === inputName
    );
    const newCashFlow = { period: calculatorData.inputs[inputIndex].value.length + 1, amount: "" };
    const updatedInputs = [...calculatorData.inputs];
    const requiredInput = updatedInputs[inputIndex];
    requiredInput.value = [...requiredInput.value, newCashFlow];
    setCalculatorData({ ...calculatorData, inputs: updatedInputs });

    const updatedFormData = { ...formData };
    updatedFormData[inputName] = [...(updatedFormData[inputName] || []), ""];
    setFormData(updatedFormData);
  };

  const deleteCashFLow = (event, inputName, cashflow) => {
    event.preventDefault();
    let currentInputVal = calculatorData.inputs.find(
      (input) => input.name === inputName
    );
    let updatedInputValues = currentInputVal.value.filter(val => val.period!=cashflow.period);
    currentInputVal.value = updatedInputValues;
    
    const updatedInputs = [...calculatorData.inputs];
    const requiredInput = updatedInputs[currentInputVal];
    setCalculatorData({ ...calculatorData, inputs: updatedInputs });

    const updatedFormData = { ...formData };
    updatedFormData[inputName] = [...(updatedFormData[inputName] || []), ""];
    setFormData(updatedFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const currentInput = calculatorData.inputs.find((d) => d.name === name);
    currentInput.value = value;
    const updatedInputs = calculatorData.inputs.map((d) => {
      if (d.name !== name) {
        return d;
      } else {
        return currentInput;
      }
    });
    setCalculatorData({ ...calculatorData, inputs: updatedInputs });

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const renderInputField = (input, index) => {
    switch (input.type) {
      case "text":
      case "number":
        return (
          <div className="mb-4" key={index}>
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
      case "array":
        return (
          <div className="mb-4" key={index}>
            <span htmlFor={input.name} style={{ color: textColor }} className="block font-bold mb-2">{input.label}</span>
            {input.value.map((cashFlow, i) => (
              <div className="flex items-center" key={i}>
                <span style={{ color: textColor }} className="mr-2">Period {cashFlow.period}:</span>
                <input
                  className="w-1/2 border border-gray-400 p-2 rounded mr-2"
                  type="number"
                  name={input.name}
                  onChange={(e) => handleArrayInputChange(e, index, i)}
                  value={formData[input.name] && formData[input.name][i] ? formData[input.name][i].amount : ""}
                />
                <button onClick = {(e)=>deleteCashFLow(e,input.name, cashFlow)} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={(e) => addCashFlow(e, input.name)}
            >
              Add Cash Flow
              </button>
          </div>
        );
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

        <p style={{ color: textColor }} className="yy">Dark Theme</p>
        <label className="ml-4 inline-flex relative items-center cursor-pointer">
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

export default connect(mapStateToProps, mapDispatchToProps)(DynamicCalculatorPage);
const staticData = {
  allCalculators: [
    {
      id: "1",
      categoryName: "Finance",
      name: "Compound Interest Calculator",
      inputs: [
        { name: "principle", "required": true, type: "number", label: "Principle", value: "" },
        { name: "rate", type: "number", "required": true, label: "Rate of interest", value: "" },
        { name: "time", type: "number", "required": true, label: "Time period", value: "" },
        {
          name: "compoundInterval", "required": true,
          type: "number",
          label: "Compounding interval (in months)",
          value: "",
        },
      ],
      formula:
        "principle * Math.pow(1 + (rate / (compoundInterval * 100)), (compoundInterval * time)) - principle",
      resultName: "Compound Interest",
      isGraph: true
    },
    {
      id: "2",
      categoryName: "Finance",
      name: "Dividend Calculator",
      inputs: [
        { name: "investment", "required": true, type: "number", label: "Investment", value: "" },
        { name: "dividendRate", "required": true, type: "number", label: "Dividend Rate", value: "" },
        { name: "numberOfShares", "required": true, type: "number", label: "Number of Shares", value: "" }
      ],
      formula: "investment * dividendRate * numberOfShares",
      resultName: "Dividend",
      isGraph: false
    },
    {
      id: "3",
      categoryName: "Finance",
      name: "Net Present Value Calculator",
      inputs: [
        { name: "initialInvestment", type: "number", label: "Initial Investment", value: "" },
        { name: "discountRate", type: "number", label: "Discount Rate", value: "" },
        { name: "cashFlows", type: "array", label: "Cash Flows", value: [
          { period: 1, amount: "" },
          { period: 2, amount: "" },
          { period: 3, amount: "" }
        ]}
      ],
      formula: `
        let pv = 0;
        let { initialInvestment, discountRate, cashFlows } = inputValues;
        for (let i = 0; i < cashFlows.length; i++) {
          let { period, amount } = cashFlows[i];
          let discountFactor = Math.pow(1 + (discountRate / 100), -period);
          pv += amount * discountFactor;
        }
        pv - initialInvestment;
      `,
      resultName: "Net Present Value",
      isGraph: false
    }

  ]
};

export default staticData;

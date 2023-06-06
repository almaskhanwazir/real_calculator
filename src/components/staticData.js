const staticData = {
  allCalculators: [
    {
      id: "1", 
      categoryName: "Finance",
      name: "Compound Interest Calculator",
      inputs: [
        { name: "initialBalance", required: true, type: "number", label: "Initial Balance", value: "" },
        { name: "interestRate", required: true, type: "number", label: "Interest Rate", value: "" },
        { name: "time", required: true, type: "number", label: "Term (years)", value: "" },
        { 
          name: "compoundFrequency",
          required: true, 
          type: "select",
          options: [
            { label: "Annually", value: 1 },
            { label: "Semiannually", value: 2 },
            { label: "Quarterly", value: 4 },
            { label: "Monthly", value: 12 }
          ],
          label: "Compounding Frequency",
          value: 1
        }
      ],
      formula: `
        initialBalance * 
        (1 + (interestRate / compoundFrequency)) ^ (compoundFrequency * time)
      `,
      resultName: "Final Balance",
      results: [
        { name: "totalInterest", label: "Total Interest" }
      ],
      isGraph: true,
      graphData: {
        xKey: "name",
        yKeys: ["balance", "totalInterest"],
        colors: ["#8884d8", "#82ca9d"],
        title: "Compound Interest Growth",
        xLabel: "Year",
        yLabel: "Balance",
        width: 672,
        height: 400
      }
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

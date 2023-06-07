const staticData = {
  allCalculators: [
    {
      id: "1",
      categoryName: "Finance",
      name: "Compound Interest Calculator",
      inputs: [
        {
          name: "initialBalance",
          required: true,
          type: "number",
          label: "Initial Balance",
          value: "",
        },
        {
          name: "interestRate",
          required: true,
          type: "number",
          label: "Interest Rate",
          value: "",
        },
        {
          name: "time",
          required: true,
          type: "number",
          label: "Term (years)",
          value: "",
        },
        {
          name: "compoundFrequency",
          required: true,
          type: "select",
          options: [
            { label: "Annually", value: 1 },
            { label: "Semiannually", value: 2 },
            { label: "Quarterly", value: 4 },
            { label: "Monthly", value: 12 },
          ],
          label: "Compounding Frequency",
          value: 1,
        },
      ],
      formula: `
        initialBalance * 
        (1 + (interestRate / compoundFrequency)) ^ (compoundFrequency * time)
      `,
      resultName: "Final Balance",
      results: [{ name: "totalInterest", label: "Total Interest" }],
      isGraph: true,
      graphData: {
        xKey: "name",
        yKeys: ["balance", "totalInterest"],
        colors: ["#8884d8", "#82ca9d"],
        title: "Compound Interest Growth",
        xLabel: "Year",
        yLabel: "Balance",
        width: 672,
        height: 400,
      },
    },
    {
      id: "2",
      categoryName: "Finance",
      name: "Dividend Calculator",
      inputs: [
        {
          name: "investment",
          required: true,
          type: "number",
          label: "Investment",
          value: "",
        },
        {
          name: "dividendRate",
          required: true,
          type: "number",
          label: "Dividend Rate",
          value: "",
        },
        {
          name: "numberOfShares",
          required: true,
          type: "number",
          label: "Number of Shares",
          value: "",
        },
      ],
      formula: "investment * dividendRate * numberOfShares",
      resultName: "Dividend",
      isGraph: false,
    },
  ],
  investmentCalculators: [
    {
      id: "1",
      name: "Final Balance Calculator",
      inputs: [
        {
          name: "initialInvestment",
          required: true,
          type: "number",
          label: "Initial Investment",
          value: "",
        },
        {
          name: "rateOfReturn",
          required: true,
          type: "number",
          label: "Rate of Return",
          value: "",
        },
        {
          name: "term",
          required: true,
          type: "number",
          label: "Term (years)",
          value: "",
        },
        {
          name: "compoundFrequency",
          required: true,
          type: "select",
          options: [
            { label: "Annually", value: 1 },
            { label: "Semiannually", value: 2 },
            { label: "Quarterly", value: 4 },
            { label: "Monthly", value: 12 },
          ],
          label: "Compounding Frequency",
          value: 1,
        },
        {
          name: "annualInflationRate",
          required: true,
          type: "number",
          label: "Annual Inflation Rate",
          value: "",
        },
      ],
      formula: `
        initialInvestment *
        (1 + (rateOfReturn / compoundFrequency - annualInflationRate)) ^ (compoundFrequency * term)
      `,
      resultName: "Final Balance",
    },

    {
      id: "2",
      name: "Initial Investment Calculator",
      inputs: [
        {
          name: "desiredBalance",
          required: true,
          type: "number",
          label: "Desired Balance",
          value: "",
        },
        {
          name: "rateOfReturn",
          required: true,
          type: "number",
          label: "Rate of Return",
          value: "",
        },
        {
          name: "term",
          required: true,
          type: "number",
          label: "Term (years)",
          value: "",
        },
        {
          name: "compoundFrequency",
          required: true,
          type: "select",
          options: [
            { label: "Annually", value: 1 },
            { label: "Semiannually", value: 2 },
            { label: "Quarterly", value: 4 },
            { label: "Monthly", value: 12 },
          ],
          label: "Compounding Frequency",
          value: 1,
        },
        {
          name: "annualInflationRate",
          required: true,
          type: "number",
          label: "Annual Inflation Rate",
          value: "",
        },
      ],
      formula: `
    desiredBalance /
    (1 + (rateOfReturn / compoundFrequency - annualInflationRate)) ^ (compoundFrequency * term)
  `,
      resultName: "Initial Investment",
    },
    {
      id: "3",
      name: "Rate of Return Calculator",
      inputs: [
        {
          name: "desiredBalance",
          required: true,
          type: "number",
          label: "Desired Balance",
          value: "",
        },
        {
          name: "initialInvestment",
          required: true,
          type: "number",
          label: "Initial Investment",
          value: "",
        },
        {
          name: "term",
          required: true,
          type: "number",
          label: "Term (years)",
          value: "",
        },
        {
          name: "compoundFrequency",
          required: true,
          type: "select",
          options: [
            { label: "Annually", value: 1 },
            { label: "Semiannually", value: 2 },
            { label: "Quarterly", value: 4 },
            { label: "Monthly", value: 12 },
          ],
          label: "Compounding Frequency",
          value: 1,
        },
        {
          name: "annualInflationRate",
          required: true,
          type: "number",
          label: "Annual Inflation Rate",
          value: "",
        },
      ],
      formula: `
    (desiredBalance / initialInvestment) ^ (1 / term * compoundFrequency) * compoundFrequency + annualInflationRate
  `,
      resultName: "Rate of Return",
    },
    {
      id: "4",
      name: "Periodic Contribution Calculator",
      inputs: [
        {
          name: "desiredBalance",
          required: true,
          type: "number",
          label: "Desired Balance",
          value: "",
        },
        {
          name: "rateOfReturn",
          required: true,
          type: "number",
          label: "Rate of Return",
          value: "",
        },
        {
          name: "term",
          required: true,
          type: "number",
          label: "Term (years)",
          value: "",
        },
        {
          name: "contributionFrequency",
          required: true,
          type: "select",
          options: [
            { label: "Annually", value: 1 },
            { label: "Semiannually", value: 2 },
            { label: "Quarterly", value: 4 },
            { label: "Monthly", value: 12 },
          ],
          label: "Contribution Frequency",
          value: 1,
        },
        {
          name: "contributionAmount",
          required: true,
          type: "number",
          label: "Contribution Amount",
          value: "",
        },
        {
          name: "annualInflationRate",
          required: true,
          type: "number",
          label: "Annual Inflation Rate",
          value: "",
        },
      ],
      formula: `
    (desiredBalance - contributionAmount * (((1 + (rateOfReturn / contributionFrequency - annualInflationRate)) ^ (contributionFrequency * term) - 1) / (rateOfReturn / contributionFrequency - annualInflationRate))) /
    ((1 + (rateOfReturn / contributionFrequency - annualInflationRate)) ^ (contributionFrequency * term) - 1) *
    (rateOfReturn / contributionFrequency - annualInflationRate)
  `,
      resultName: "Periodic Contribution",
    },
  ],
};

export default staticData;
